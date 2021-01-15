import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const MakerCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="maker" /* validate={required()} */ />
            <TextInput source="country_make" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
