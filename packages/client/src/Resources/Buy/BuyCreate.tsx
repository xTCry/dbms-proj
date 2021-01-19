import React from 'react';
import { Create, DateInput, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const BuyCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source="buy_price" validate={required()} />
            <NumberInput source="quantity" validate={required()} />
            <DateInput source="date_buy" validate={required()} />

            <ReferenceInput source="maker_id" reference="maker">
                <SelectInput optionText="maker" />
            </ReferenceInput>

            <ReferenceInput source="component_id" reference="component">
                <SelectInput optionText="name_component" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
