import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput, DateInput } from 'react-admin';

const Title = ({ record }: any) => {
    return <span>Изменение группы {record ? `"${record.name}"` : ''}</span>;
};

export const GroupEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={required()} />
            <DateInput source="date_formation" validate={required()} />

            <ReferenceInput source="specialty_id" reference="specialty">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
