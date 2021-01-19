import React, { FC } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    EditProps,
    required,
    DateInput,
    NumberInput,
} from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.order.client.name}"` : ''}</span>;
};

export const Pruduct_trackEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <NumberInput source="quantity" validate={required()} />
            <DateInput source="date_taken" validate={required()} />

            <ReferenceInput source="order_id" reference="order">
                <SelectInput optionText="client.name" />
            </ReferenceInput>

            <ReferenceInput source="component_id" reference="component">
                <SelectInput optionText="name_component" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
