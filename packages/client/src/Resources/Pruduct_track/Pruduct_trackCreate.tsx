import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const Pruduct_trackCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="order_id" /* validate={required()} */ />
            <TextInput source="component_id" /* validate={required()} */ />
            <TextInput source="quantity" /* validate={required()} */ />
            <TextInput source="date_taken" /* validate={required()} */ />

            {/* <ReferenceInput source="order_id" reference="order">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="component_id" reference="component">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Create>
);
