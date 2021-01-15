import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const Second_inspectCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="fault" /* validate={required()} */ />
            <TextInput source="price_diagnose" /* validate={required()} */ />
            <TextInput source="date_inspect" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
