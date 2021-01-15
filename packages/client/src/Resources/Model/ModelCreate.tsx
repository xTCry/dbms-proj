import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const ModelCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="model" /* validate={required()} */ />
            <TextInput source="brand_id" /* validate={required()} */ />

            {/* <ReferenceInput source="brand_id" reference="brand">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Create>
);
