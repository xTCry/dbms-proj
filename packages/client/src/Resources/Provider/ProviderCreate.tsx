import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const ProviderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="vendor" autoFocus validate={required()} />
            <TextInput source="city" validate={required()} />
            <TextInput source="street_home" validate={required()} />
            <TextInput source="telefone" validate={required()} />
        </SimpleForm>
    </Create>
);
