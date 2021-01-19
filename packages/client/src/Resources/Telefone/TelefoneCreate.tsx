import React from 'react';
import { Create, DateInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const TelefoneCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <DateInput source="date_issues" validate={required()} />

            <ReferenceInput source="model_id" reference="model" validate={required()}>
                <SelectInput optionText="model" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
