import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { UserRole } from '../../types';
import { FullName } from '../User/UserEdit';

const Title = (props) => {
    const { record } = props ?? { record: { student_id: 'None' } };
    return <span>Студент {record ? `"${record.student_id}"` : ''}</span>;
};

export const StudentEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <TextInput source="experience" validate={required()} />
            <ReferenceInput source="user_id" reference="user" validate={required()} filter={{ role_id: UserRole.TEACHER }}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
