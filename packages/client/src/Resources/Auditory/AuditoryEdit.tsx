import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { student_id: 'None' } };
    return <span>Студент {record ? `"${record.student_id}"` : ''}</span>;
};

export const AuditoryEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <TextInput source="name" validate={required()} />
            <TextInput source="corpus" validate={required()} />
        </SimpleForm>
    </Edit>
);
