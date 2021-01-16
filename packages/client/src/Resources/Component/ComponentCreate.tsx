import React from 'react';
import { Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const ComponentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name_component" autoFocus validate={required()} />
            <TextInput source="price_install" validate={required()} />
            <TextInput source="price_client" validate={required()} />

            <ReferenceInput source="maker_id" reference="maker" validate={required()}>
                <SelectInput optionText="maker" />
            </ReferenceInput>

            <ReferenceInput source="telefone_id" reference="telefone" validate={required()}>
                <SelectInput optionText="model.model" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
