import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const DolzhnostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="position" autoFocusvalidate={required()} />
        </SimpleForm>
    </Create>
);
