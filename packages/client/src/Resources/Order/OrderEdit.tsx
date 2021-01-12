import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    required,
    SelectInput,
    ReferenceInput,
    ImageField,
    ImageInput,
} from 'react-admin';
import { orderStatus } from '.';

const OrderTitle = ({ record = { title: 'None' } } = {}) => {
    return <span>Заказ {record ? `"${record.title}"` : ''}</span>;
};

export const OrderEdit = (props) => (
    <Edit title={<OrderTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="title" validate={required()} />
            <TextInput source="description" fullWidth multiline validate={required()} />
            <DateInput source="created_at" disabled />

            <ImageInput source="images" label="Upload images" accept="image/*" multiple>
                <ImageField source="url" label="Imgae" />
            </ImageInput>

            <SelectInput source="status" choices={orderStatus} validate={required()} />

            <ReferenceInput source="executor" reference="users" validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
