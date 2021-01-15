import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const OrderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="telefone_id" /* validate={required()} */ />
            <TextInput source="status_id" /* validate={required()} */ />
            <TextInput source="operator_id" /* validate={required()} */ />
            <TextInput source="engineer_id" /* validate={required()} */ />
            <TextInput source="first_inspect_id" /* validate={required()} */ />
            <TextInput source="second_inspect_id" /* validate={required()} */ />
            <TextInput source="client_id" /* validate={required()} */ />
            <TextInput source="date_accept" /* validate={required()} */ />
            <TextInput source="date_issues" /* validate={required()} */ />
            <TextInput source="price_repair" /* validate={required()} */ />

            {/* <ReferenceInput source="telefone_id" reference="telefone">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="status_id" reference="status">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="users_id" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="first_inspect_id" reference="first_inspect">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="second_inspect_id" reference="second_inspect">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="client_id" reference="client">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Create>
);
