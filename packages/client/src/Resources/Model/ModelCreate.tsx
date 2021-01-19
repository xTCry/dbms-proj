import React from 'react';
import { Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const ModelCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="model" autoFocus validate={required()} />

            <ReferenceInput source="brand_id" reference="brand" validate={required()}>
                <SelectInput optionText="brand" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
