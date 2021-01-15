import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const GraphicCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="graphic_work" /* validate={required()} */ />
            <TextInput source="graphic_hours" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
