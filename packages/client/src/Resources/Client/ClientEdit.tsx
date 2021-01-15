import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const ClientEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="surname" /* disabled validate={required()} */ />
            <TextInput source="name" /* disabled validate={required()} */ />
            <TextInput source="mid_name" /* disabled validate={required()} */ />
            <TextInput source="mob_telefone" /* disabled validate={required()} */ />
        </SimpleForm>
    </Edit>
);
