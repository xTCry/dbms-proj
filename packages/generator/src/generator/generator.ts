import Fs from 'fs-extra';

export type GenModelName = string;
export type GenModelAttribute = string | { name: string; required?: boolean };
export type GenModelInclude = string | { name: string; reference?: string };
export type GenParam = [GenModelName, GenModelAttribute[]?, GenModelInclude[]?];

export const toUp = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const toModelAttribute = (e?: GenModelAttribute[]) =>
    e?.map((e) => (typeof e === 'string' ? { name: e, required: undefined } : e));
export const toModelInclude = (e?: GenModelInclude[]) =>
    e?.map((e) => (typeof e === 'string' ? { name: e, reference: undefined } : e));

export async function write(path: string, file: string, data: string) {
    await Fs.ensureDir(path);
    await Fs.writeFile(`${path}/${file}`, data);
}

// import { multi as multiController } from "./controller.generator";
// import { multi as multiResource, Tmulti } from './resource.generator';
// import { multi as multiCRUD } from './crud.generator';

const rows: GenParam[] = [
    ['brand', ['id', 'brand']],
    ['buy', ['id', 'component_id', 'maker_id', 'buy_price', 'quantity', 'date_buy'], ['provider', 'component']],
    ['client', ['id', 'surname', 'name', 'mid_name', 'mob_telefone']],
    [
        'component',
        ['id', 'telefone_id', 'maker_id', 'name_component', 'price_install', 'price_client'],
        ['maker', 'telefone'],
    ],
    ['dolzhnost', ['id', 'position']],
    ['first_inspect', ['id', 'visible_defects', 'comment_client', 'date_inspect']],
    ['graphic', ['id', 'graphic_work', 'graphic_hours']],
    ['maker', ['id', 'maker', 'country_make']],
    ['model', ['id', 'model', 'brand_id'], ['brand']],
    [
        'order',
        [
            'id',
            'telefone_id',
            'status_id',
            'operator_id',
            'engineer_id',
            'first_inspect_id',
            'second_inspect_id',
            'client_id',
            'date_accept',
            'date_issues',
            'price_repair',
        ],
        ['telefone', 'status', /* 'users', */ 'users', 'first_inspect', 'second_inspect', 'client'],
    ],
    ['provider', ['id', 'vendor', 'city', 'street_home', 'telefone']],
    ['pruduct_track', ['id', 'order_id', 'component_id', 'quantity', 'date_taken'], ['order', 'component']],
    ['second_inspect', ['id', 'fault', 'price_diagnose', 'date_inspect']],
    ['status', ['id', 'status_done']],
    ['telefone', ['id', 'model_id', 'date_issues'], ['model']],
    [
        'users',
        ['id', 'surname', 'name', 'mid_name', 'photo_employee', 'graphic_id', 'position_id', 'login', 'password'],
        ['graphic', 'dolzhnost'],
    ],

    // ['myName', ['id', 'name', 'kek_id'], ['kek']],
];
