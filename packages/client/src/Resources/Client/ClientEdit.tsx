import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.name}"` : ''}</span>;
};

export const ClientEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <TextInput source="surname" validate={required()} />
            <TextInput source="name" validate={required()} />
            <TextInput source="mid_name" validate={required()} />
            <TextInput source="mob_telefone" validate={required()} />
        </SimpleForm>
    </Edit>
);
