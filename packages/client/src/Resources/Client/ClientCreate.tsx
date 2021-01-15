import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const ClientCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="surname" /* validate={required()} */ />
            <TextInput source="name" /* validate={required()} */ />
            <TextInput source="mid_name" /* validate={required()} */ />
            <TextInput source="mob_telefone" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
