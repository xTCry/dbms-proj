import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { UserRole } from '../../types';
import { FullName } from '../User/UserEdit';

const Title = (props) => {
    const { record } = props ?? { record: { student_id: 'None' } };
    return <span>Студент {record ? `"${record.student_id}"` : ''}</span>;
};

export const LessonEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);
