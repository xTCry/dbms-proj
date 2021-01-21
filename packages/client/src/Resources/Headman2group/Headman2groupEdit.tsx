import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { UserRole } from '../../types';

const Title = (props) => {
    const { record } = props ?? { record: { student_id: 'None' } };
    return <span>Изменение старосты группы {record ? `"${record.student_id}"` : ''}</span>;
};

export const Headman2groupEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <ReferenceInput
                source="student_id"
                reference="student"
                validate={required()}
                // filter={{ role_id: UserRole.STUDENT }}
            >
                <SelectInput optionText="user.name" />
            </ReferenceInput>

            <ReferenceInput source="group_id" reference="group" validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
