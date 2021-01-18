#!/usr/bin/env node

import Fs from 'fs-extra';
import Path from 'path';
import { Command } from 'commander';
import { slog } from '@dbms-proj/utils';
import { GenParam } from './generator/generator';
import { generateByRows as generateController } from './generator/controller.generator';
import { generateByRows as generateResource } from './generator/resource.generator';
import { generateByRows as generateCRUD } from './generator/crud.generator';

interface IProgram extends Command {
    model: string;
}

type GenOptions = {
    crud: boolean;
    controller: boolean;
    resource: boolean;
    model: string;
};

const program = new Command() as IProgram;
program.version('1.0.0').description('Generator of files from database models');

program
    .command('clear')
    .description('Clear out folder')
    .action(() => {
        Fs.rmdirSync('./out/', { recursive: true });
    });

    program
    .command('gen' /* , { isDefault: true } */)
    .option('-m, --model <json|js file>', 'set path to json or js model', './import_model.js')
    .option('-A, --no-crud', 'will not generate crud file')
    .option('-C, --no-controller', 'will not generate controller files')
    .option('-R, --no-resource', 'will not generate resource files')
    .description('Start file generation')
    .action((options) => runGen(options).then());

program.parse();

const GenModelTemplate: GenParam[] = [
    ['model_A', ['id', 'name', 'last_name']],
    ['model_B', ['id', { name: 'title', required: true }, { name: 'status', required: true }, 'count']],
    [
        'model_C',
        ['id', { name: 'name', required: true }, { name: 'post_id', required: true }, 'author_id'],
        ['post', { name: 'author', reference: 'model_A' }],
    ],
    ['model_D', ['id', { name: 'post_id', required: true }], ['post']],
];

async function runGen(option: GenOptions) {
    const gLog = slog.scope('generator');
    const ext = Path.extname(option.model);
    const modelPath = Path.resolve(process.cwd(), option.model);

    if (!(await Fs.pathExists(modelPath))) {
        gLog.warn('model file not found');
        try {
            gLog.log('generating empty model file...');
            if (ext === '.json') {
                await Fs.writeJson(modelPath, GenModelTemplate);
            } else {
                await Fs.writeFile(modelPath, `exports.model = ${/* JSON.stringify(GenModelTemplate, null, 2) */''}[/*
                    ['model_A', ['id', 'name', 'last_name']],
                    ['model_B', ['id', { name: 'title', required: true }, { name: 'status', required: true }, 'count']],
                    [
                        'model_C',
                        ['id', { name: 'name', required: true }, { name: 'post_id', required: true }, 'author_id'],
                        ['post', { name: 'author', reference: 'model_A' }],
                    ],
                    ['model_D', ['id', { name: 'post_id', required: true }], ['post']],
                */];`);
            }
            gLog.log('model file created!');
            gLog.log('put your model data in the generated file and try again');
            process.exit();
        } catch (err) {
            gLog.error(err);
        }
    }

    let modelData: GenParam[] = [];
    try {
        if (ext === '.json') {
            modelData = await Fs.readJson(modelPath);
        } else {
            modelData = require(modelPath)?.model;
        }
        gLog.debug('modelData', modelData);
    } catch (err) {
        gLog.error(err);
        process.exit(1);
    }

    if (option.controller) {
        gLog.await('generating Controllers...')
        await generateController(modelData);
        gLog.success('Controllers has been done')
    }
    if (option.resource) {
        gLog.await('generating Resources...')
        await generateResource(modelData);
        gLog.success('Resources has been done')
    }
    if (option.crud) {
        gLog.await('generating CRUDs...')
        await generateCRUD(modelData);
        gLog.success('CRUDs has been done')
    }

    gLog.success('All files generated')
}
