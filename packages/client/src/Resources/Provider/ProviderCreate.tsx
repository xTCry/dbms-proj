import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const ProviderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="vendor" /* validate={required()} */ />
            <TextInput source="city" /* validate={required()} */ />
            <TextInput source="street_home" /* validate={required()} */ />
            <TextInput source="telefone" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
