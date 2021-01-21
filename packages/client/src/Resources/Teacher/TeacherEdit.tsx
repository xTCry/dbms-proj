import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { UserRole } from '../../types';
import { FullName } from '../User/FullNameField';

const Title = (props) => {
    const { record } = props;
    return <span>Изменение преподавателя {record ? `"${FullName(record.user)}"` : ''}</span>;
};

export const TeacherEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <TextInput source="experience" />
            <ReferenceInput
                source="user_id"
                reference="user"
                validate={required()}
                filter={{ role_id: UserRole.TEACHER }}
            >
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
