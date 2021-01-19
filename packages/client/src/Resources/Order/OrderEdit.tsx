import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps, required, DateInput } from 'react-admin';
import { UserRole } from '../../types';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.client.name}"` : ''}</span>;
};

export const OrderEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <DateInput source="date_accept" validate={required()} />
            <DateInput source="date_issues" />
            <TextInput source="price_repair" />

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
                filter={{ position_id: UserRole.OPERATOR }}
            >
                <SelectInput optionText="name" />
            </ReferenceInput>

            <ReferenceInput
                source="engineer_id"
                reference="users"
                validate={required()}
                filter={{ position_id: [UserRole.ENGEENER, UserRole.ENGEENER_LEAD] }}
            >
                <SelectInput optionText="name" />
            </ReferenceInput>

            <ReferenceInput source="first_inspect_id" reference="first_inspect" validate={required()}>
                <SelectInput optionText="comment_client" />
            </ReferenceInput>

            <ReferenceInput source="second_inspect_id" reference="second_inspect">
                <SelectInput optionText="fault" />
            </ReferenceInput>

            <ReferenceInput source="client_id" reference="client" validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
