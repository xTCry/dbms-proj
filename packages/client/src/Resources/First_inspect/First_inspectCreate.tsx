import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const First_inspectCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="visible_defects" /* validate={required()} */ />
            <TextInput source="comment_client" /* validate={required()} */ />
            <TextInput source="date_inspect" /* validate={required()} */ />
        </SimpleForm>
    </Create>
);
