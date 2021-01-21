import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { UserRole } from '../../types';
import { FullName } from '../User/FullNameField';

const Title = (props) => {
    const { record } = props;
    return <span>Изменение дисцип. преп. {record ? `"${FullName(record.teacher.user)}"` : ''}</span>;
};

export const Teacher2lessonEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <ReferenceInput
                source="teacher_id"
                reference="teacher"
                validate={required()}
                filter={{ role_id: UserRole.TEACHER }}
            >
                <SelectInput optionText={FullName} />
            </ReferenceInput>

            <ReferenceInput source="lesson_id" reference="lesson" validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
