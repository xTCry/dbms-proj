import React from 'react';
import { Create, DateInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { UserRole } from '../../types';

export const OrderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <DateInput source="date_accept" autoFocus validate={required()} />
            <DateInput source="date_issues" validate={required()} />
            <TextInput source="price_repair" validate={required()} />

            <ReferenceInput source="telefone_id" reference="telefone" validate={required()}>
                <SelectInput optionText="model.model" />
            </ReferenceInput>

            <ReferenceInput source="status_id" reference="status" validate={required()}>
                <SelectInput optionText="status_done" />
            </ReferenceInput>

            <ReferenceInput
                source="operator_id"
                reference="users"
                validate={required()}
                filter={{ role_id: UserRole.OPERATOR }}
            >
                <SelectInput optionText="name" />
            </ReferenceInput>

            <ReferenceInput
                source="engineer_id"
                reference="users"
                validate={required()}
                filter={{ role_id: [UserRole.ENGEENER, UserRole.ENGEENER_LEAD] }}
            >
                <SelectInput optionText="name" />
            </ReferenceInput>

            <ReferenceInput source="first_inspect_id" reference="first_inspect" validate={required()}>
                <SelectInput optionText="comment_client" />
            </ReferenceInput>

            <ReferenceInput source="second_inspect_id" reference="second_inspect" validate={required()}>
                <SelectInput optionText="fault" />
            </ReferenceInput>

            <ReferenceInput source="client_id" reference="client" validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
