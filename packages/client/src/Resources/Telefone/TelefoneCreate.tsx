import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const TelefoneCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="model_id" /* validate={required()} */ />
            <TextInput source="date_issues" /* validate={required()} */ />

            {/* <ReferenceInput source="model_id" reference="model">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Create>
);
