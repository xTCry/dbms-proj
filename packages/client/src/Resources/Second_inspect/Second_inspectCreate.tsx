import React from 'react';
import { Create, DateInput, NumberInput, required, SimpleForm, TextInput } from 'react-admin';

export const Second_inspectCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="fault" autoFocus validate={required()} />
            <NumberInput source="price_diagnose" validate={required()} />
            <DateInput source="date_inspect" validate={required()} />
        </SimpleForm>
    </Create>
);
