import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const BrandCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="brand" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
