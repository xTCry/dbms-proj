import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { UserRole } from '../../types';
import { FullName } from '../User/FullNameField';

const Title = (props) => {
    const { record } = props ?? { record: { student_id: 'None' } };
    return <span>Изменение студента {record ? `"${record.student_id}"` : ''}</span>;
};

export const StudentEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="student_id" validate={required()} />

            <ReferenceInput
                source="user_id"
                reference="user"
                filter={{ role_id: UserRole.STUDENT }}
                validate={required()}
            >
                <SelectInput optionText={FullName} />
            </ReferenceInput>

            <ReferenceInput source="group_id" reference="group" validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
