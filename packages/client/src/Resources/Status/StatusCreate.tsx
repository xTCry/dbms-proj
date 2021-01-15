import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const StatusCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="status_done" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
