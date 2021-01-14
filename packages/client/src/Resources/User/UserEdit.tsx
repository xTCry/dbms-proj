import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    required,
    PasswordInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';
import { UserRole } from '../../types';

export const FullName = (record) => ['last_name', 'name', 'second_name'].map((e) => record[e]).join(' ');

const UserTitle = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>Пользователь {record ? `"${FullName(record)}"` : ''}</span>;
};

export const UserEdit = ({ permissions, ...props }) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="login" disabled validate={required()} />
            <TextInput source="name" validate={required()} />
            <TextInput source="last_name" validate={required()} />
            <TextInput source="second_name" />
            <DateInput source="personal_birthday" />
            <DateInput source="registeration_date" disabled />
            {[UserRole.ADMIN, UserRole.DEKAN].includes(permissions) && (
                <PasswordInput source="password" resource="users" />
            )}

            <ReferenceInput source="role_id" reference="role">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
