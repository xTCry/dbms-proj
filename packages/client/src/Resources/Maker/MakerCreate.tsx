import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const MakerCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="maker" autoFocus validate={required()} />
            <TextInput source="country_make" validate={required()} />
        </SimpleForm>
    </Create>
);
