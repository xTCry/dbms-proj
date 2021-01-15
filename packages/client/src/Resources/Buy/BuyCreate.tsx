import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const BuyCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="component_id" /* validate={required()} */ />
            <TextInput source="maker_id" /* validate={required()} */ />
            <TextInput source="buy_price" /* validate={required()} */ />
            <TextInput source="quantity" /* validate={required()} */ />
            <TextInput source="date_buy" /* validate={required()} */ />

            {/* <ReferenceInput source="provider_id" reference="provider">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="component_id" reference="component">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Create>
);
