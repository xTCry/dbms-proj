import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { FullName } from '../User/UserEdit';

const Title = (props) => {
    const { record } = props ?? { record: { student_id: 'None' } };
    return <span>Студент {record ? `"${record.student_id}"` : ''}</span>;
};

export const StudentEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="student_id" validate={required()} />

            <ReferenceInput source="user_id" reference="user" filter={{ role_id: 3 }}>
                <SelectInput optionText={FullName} />
            </ReferenceInput>

            <ReferenceInput source="group_id" reference="group">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
