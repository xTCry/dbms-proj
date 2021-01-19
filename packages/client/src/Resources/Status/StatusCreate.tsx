import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const StatusCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="status_done" autoFocus validate={required()} />
        </SimpleForm>
    </Create>
);
