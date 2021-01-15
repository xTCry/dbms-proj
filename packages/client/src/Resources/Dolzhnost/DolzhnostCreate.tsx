import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const DolzhnostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="position" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
