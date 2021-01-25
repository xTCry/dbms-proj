import express, { ErrorRequestHandler } from 'express';
import Sequelize from 'sequelize';
import cors from 'cors';
import Boom from '@hapi/boom';
import Path from 'path';
import { slog } from '@dbms-proj/utils';

import { appLogging } from './tools/appLogging';
import './database';
import apiRoutes from './routes/api';

// Error handler
const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    appLogging('error')(req, res, () => {});

    slog.fav(req.path);
    slog.error(err.stack ? `${err.toString()}\n${err.stack.split('\n')[1]}` : err);

    if (err.statusCode) {
        res.status(err.statusCode).json(err);
        return;
    }

    if (err.isBoom) {
        const { statusCode, payload } = err.output;
        res.status(statusCode).json(payload);
        return;
    }

    console.log('err', JSON.parse(JSON.stringify(err)));

    if (err instanceof Sequelize.ValidationError) {
    }

    if (['SequelizeValidationError', 'SequelizeDatabaseError'].includes(err?.name)) {
        let message = 'Ошибка при выполнении SQL запроса';
        let type = 'db error';

        if (err.errors?.length > 0) {
            [{ message, type }] = err.errors;
        } else if (err.parent?.message) {
            ({ message } = err.parent);
        }

        res.status(400).json({
            statusCode: 400,
            error: type,
            message,
        });
        return;
    }

    const defaultError = Boom.badImplementation(err.message || 'An internal server error occurred');
    const { statusCode, payload } = defaultError.output;
    res.status(statusCode).json(payload);
};

export async function createApp() {
    const app = express();
    let buildClientPath = Path.join(__dirname, '../../client/build');

    app
        // Backend middleware
        .use((req, res, next) => {
            res.jsongo = (e: any) => res.json({ response: e });
            next();
        })
        .use(appLogging())
        .use(cors())

        .use(express.static(buildClientPath))

        .use('/api', apiRoutes)
        .use('/uploads', express.static('./uploads'))

        .get('/*', (req, res) => {
            res.sendFile(Path.join(buildClientPath, 'index.html'));
        })
        // Default 404
        .use((req, res, next) => {
            next(Boom.notFound());
        })

        .use(errHandler);

    return app;
}
