import { GenParam, toUp, write } from "./generator";

const path = './out';

export const generateCRUD = (names: string[]): [string, string] => {
    const code = `
import {${names.map((name) => `\n    ${toUp(name)}Controller,`).join('')}
} from '../../controllers';

// ...

// Set models controllers
${names
    .map(
        (name) => `
router.use(
    '/${name.toLowerCase()}',
    authType.required,
    crud(${toUp(name)}Controller, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles: [UserRole.ADMIN],
    })
);
`
    )
    .join('')}`;
    return [`crud.api.ts`, code];
};

export async function generateByRows(rows: GenParam[]) {
    let names = rows.map((e) => e[0]);
    await write(path, ...generateCRUD(names));
}
