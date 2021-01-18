import {
    GenModelAttribute,
    GenModelInclude,
    GenModelName,
    GenParam,
    toModelAttribute,
    toModelInclude,
    toUp,
    write,
} from './generator';

const path = './out/controllers';

export const generateController = (
    name: GenModelName,
    u_attrs?: GenModelAttribute[],
    u_includes?: GenModelInclude[]
): [string, string] => {
    let attrs = toModelAttribute(u_attrs);
    let includes = toModelInclude(u_includes);
    const code = `import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller${
        (includes?.length &&
            `, ${includes
                .map((e) => `${toUp(e.reference ?? e.name)}Controller, I${toUp(e.reference ?? e.name)}JSON`)
                .join(', ')}`) ||
        ''
    } } from './';
import { ${name}, ${name}Attributes, ${name}CreationAttributes${
        (includes?.length && `, ${includes.map((e) => e.name).join(', ')}`) || ''
    } } from '@dbms-proj/models';

export type I${toUp(name)}JSON = ${name}Attributes${
        (includes?.length &&
            ` & { ${includes
                .map(
                    (e) =>
                        `${e.reference ?? e.name}${
                            attrs?.find((a) => a.name === e.reference)?.required ? '' : '?'
                        }: I${toUp(e.reference ?? e.name)}JSON;`
                )
                .join(' ')} }`) ||
        ''
    };

export class ${toUp(name)}Controller extends Controller {
    public static model = ${name} as ModelCtor<${name}>;

    public static async doCreate(data: ${name}CreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<${name}Attributes>, data: any, urole?: UserRole) {
        return super.doUpdate<${name}, ${name}Attributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<${name}Attributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<${name}Attributes>, urole?: UserRole) {
        return super.doGetList<${name}, ${name}Attributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<${name}Attributes> {
        return {
            attributes: [${attrs?.map((e) => `'${e.name}'`).join(', ')}],
            include: [${
                (includes?.length &&
                    `${includes
                        ?.map(
                            (e) => `
                {
                    // @ts-ignore
                    model: ${e.name},
                    ...${toUp(e.name)}Controller.fullAttr(safe, urole, ++deep),
                },`
                        )
                        .join('')}
            `) ||
                ''
            }],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}
`;
    return [`${name}.controller.ts`, code];
};

export const generateIndex = (names: string[]) => {
    return `export { Controller } from './controller';
${names?.map((e) => `export { ${toUp(e)}Controller, I${toUp(e)}JSON } from './${e}.controller';`).join('\n')}\n`;
};

export async function generateByRows(rows: GenParam[]) {
    let names = [];
    for (const row of rows) {
        names.push(row[0]);
        await write(path, ...generateController(...row));
    }
    await write(path, 'index.ts', generateIndex(names));
}
