import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const BrandCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="brand" autoFocus validate={required()} />
        </SimpleForm>
    </Create>
);
