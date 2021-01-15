import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const OrderEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="telefone_id" /* disabled validate={required()} */ />
            <TextInput source="status_id" /* disabled validate={required()} */ />
            <TextInput source="operator_id" /* disabled validate={required()} */ />
            <TextInput source="engineer_id" /* disabled validate={required()} */ />
            <TextInput source="first_inspect_id" /* disabled validate={required()} */ />
            <TextInput source="second_inspect_id" /* disabled validate={required()} */ />
            <TextInput source="client_id" /* disabled validate={required()} */ />
            <TextInput source="date_accept" /* disabled validate={required()} */ />
            <TextInput source="date_issues" /* disabled validate={required()} */ />
            <TextInput source="price_repair" /* disabled validate={required()} */ />

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
    </Edit>
);
