import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { UserRole } from '../../types';

const Title = (props) => {
    const { record } = props ?? { record: { student_id: 'None' } };
    return <span>Студент {record ? `"${record.student_id}"` : ''}</span>;
};

export const Teacher2lessonEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <ReferenceInput source="teacher_id" reference="teacher" validate={required()} filter={{ role_id: UserRole.TEACHER }}>
                <SelectInput optionText="user.name" />
            </ReferenceInput>

            <ReferenceInput source="lesson_id" reference="lesson" validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
