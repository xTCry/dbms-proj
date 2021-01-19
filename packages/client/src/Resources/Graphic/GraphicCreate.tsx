import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const GraphicCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="graphic_work"autoFocus validate={required()} />
            <TextInput source="graphic_hours" validate={required()} />
        </SimpleForm>
    </Create>
);
