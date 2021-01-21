import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { student_id: 'None' } };
    return <span>Изменение специальности {record ? `"${record.student_id}"` : ''}</span>;
};

export const SpecialtyEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <TextInput source="name" validate={required()} />
            <ReferenceInput source="kafedra_id" reference="kafedra">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
