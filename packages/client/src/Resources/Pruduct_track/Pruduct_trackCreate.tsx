import React from 'react';
import { Create, DateInput, NumberInput, ReferenceInput, required, SelectInput, SimpleForm } from 'react-admin';

export const Pruduct_trackCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source="quantity" validate={required()} />
            <DateInput source="date_taken" validate={required()} />

            <ReferenceInput source="order_id" reference="order">
                <SelectInput optionText="client.name" />
            </ReferenceInput>

            <ReferenceInput source="component_id" reference="component">
                <SelectInput optionText="name_component" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
