import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const ClientCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="surname" autoFocus validate={required()} />
            <TextInput source="name" validate={required()} />
            <TextInput source="mid_name" validate={required()} />
            <TextInput source="mob_telefone" validate={required()} />
        </SimpleForm>
    </Create>
);
