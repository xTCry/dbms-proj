import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

export const First_inspectCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="visible_defects" autoFocus validate={required()} />
            <TextInput source="comment_client" validate={required()} />
            <TextInput source="date_inspect" validate={required()} />
        </SimpleForm>
    </Create>
);
