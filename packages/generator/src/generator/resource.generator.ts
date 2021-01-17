import Fs from 'fs-extra';
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

const path = './out/resources';

export const generateIndex = (names: string[]) => {
    return names.map((e) => `export { ${e.toLowerCase()}Resource } from './${toUp(e)}';`).join('\n');
};

export const generateResourceIndex = (name: string, ...mode: any[]): [string, string] => {
    const code = `import { ${toUp(name)}List } from './${toUp(name)}List';
import { ${toUp(name)}Create } from './${toUp(name)}Create';
import { ${toUp(name)}Edit } from './${toUp(name)}Edit';

import icon from '@material-ui/icons/VerifiedUser';
import { UserRole } from '../../types';
export const ${toUp(name)}Icon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    fields: [UserRole.ADMIN],
};

export const ${name.toLowerCase()}Resource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? ${toUp(name)}List : null,
    create: [...allowedRoles.create].includes(permissions) ? ${toUp(name)}Create : null,
    edit: [...allowedRoles.edit].includes(permissions) ? ${toUp(name)}Edit : null,

    icon,
    name: '${name.toLowerCase()}',
});
`;
    return [`${toUp(name)}/index.ts`, code];
};

export const generateResourceList = (
    name: GenModelName,
    u_attrs?: GenModelAttribute[],
    u_includes?: GenModelInclude[]
): [string, string] => {
    let attrs = toModelAttribute(u_attrs);
    let includes = toModelInclude(u_includes);
    const code = `import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const ${toUp(name)}List = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">${
                (attrs?.length &&
                    `${attrs
                        .map(
                            (e) => `
                <TextField source="${e.name}" />`
                        )
                        .join('')}\n`) ||
                ''
            }${
        (includes?.length &&
            `${includes
                .map(
                    (e) => `
                <ReferenceField source="${e.reference ? e.name : `${e.name}_id`}" reference="${e.reference || e.name}">
                    <TextField source="name" />
                </ReferenceField>`
                )
                .join('\n')}\n`) ||
        ''
    }
                <EditButton />
            </Datagrid>
        </List>
    );
};
`;
    return [`${toUp(name)}/${toUp(name)}List.tsx`, code];
};

export const generateResourceEdit = (
    name: GenModelName,
    u_attrs?: GenModelAttribute[],
    u_includes?: GenModelInclude[]
): [string, string] => {
    let attrs = toModelAttribute(u_attrs);
    let includes = toModelInclude(u_includes);
    const code = `import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? \`"\${record.name}"\` : ''}</span>;
};

export const ${toUp(name)}Edit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>${
            (attrs?.length &&
                `${attrs
                    .map(
                        (e) => `
            <TextInput source="${e.name}"${e.name.toLowerCase() === 'id' ? ' disabled' : ''}${
                            e.required ? ' validate={required()}' : ''
                        } />`
                    )
                    .join('')}`) ||
            ''
        }${
        (includes?.length &&
            `\n${includes
                .map(
                    (e) => `
            <ReferenceInput source="${e.reference ? e.name : `${e.name}_id`}" reference="${e.reference || e.name}">
                <SelectInput optionText="name" />
            </ReferenceInput>`
                )
                .join('\n')}\n`) ||
        ''
    }
        </SimpleForm>
    </Edit>
);
`;
    return [`${toUp(name)}/${toUp(name)}Edit.tsx`, code];
};

export const generateResourceCreate = (
    name: GenModelName,
    u_attrs?: GenModelAttribute[],
    u_includes?: GenModelInclude[]
): [string, string] => {
    let attrs = toModelAttribute(u_attrs);
    let includes = toModelInclude(u_includes);
    const code = `import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const ${toUp(name)}Create = (props) => (
    <Create {...props}>
        <SimpleForm>${
            (attrs?.length &&
                `${attrs
                    .map(
                        (e, i) => `
            <TextInput source="${e.name}"${e.name.toLowerCase() === 'id' ? ' disabled' : ''}${
                            i === 0 ? ' autoFocus' : ''
                        }${e.required ? ' validate={required()}' : ''} />`
                    )
                    .join('')}`) ||
            ''
        }${
        (includes?.length &&
            `\n${includes
                .map(
                    (e) => `
            <ReferenceInput source="${e.reference ? e.name : `${e.name}_id`}" reference="${e.reference || e.name}">
                <SelectInput optionText="name" />
            </ReferenceInput>`
                )
                .join('\n')}\n`) ||
        ''
    }
        </SimpleForm>
    </Create>
);
`;
    return [`${toUp(name)}/${toUp(name)}Create.tsx`, code];
};

export async function generateByRows(rows: GenParam[]) {
    let names = [];
    for (const row of rows) {
        names.push(row[0]);
        await Fs.ensureDir(`${path}/${toUp(row[0])}`);
        await write(path, ...generateResourceIndex(...row));
        await write(path, ...generateResourceList(...row));
        await write(path, ...generateResourceEdit(...row));
        await write(path, ...generateResourceCreate(...row));
    }

    await write(path, 'index.ts', generateIndex(names));
}
