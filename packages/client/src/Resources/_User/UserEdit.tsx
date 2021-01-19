import React, { FC } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    required,
    PasswordInput,
    ReferenceInput,
    SelectInput,
    FieldProps,
    EditProps,
} from 'react-admin';
import { allowedRoles } from '.';
import CheckRole from '../../components/CheckRole';
import { usersAttributes, UserRole } from '../../types';
import FullNameField from '../Users/FullNameField';

export const FullName = (record) => ['last_name', 'name', 'second_name'].map((e) => record[e]).join(' ');

const UserTitle: FC<FieldProps<usersAttributes>> = ({ record }) =>
    record ? <FullNameField record={record} size="32" /> : null;

export const UserEdit: FC<EditProps> = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="login" disabled validate={required()} />
            <TextInput source="name" validate={required()} />
            <TextInput source="last_name" validate={required()} />
            <TextInput source="second_name" />
            <DateInput source="personal_birthday" />
            <DateInput source="registeration_date" disabled />

            <PasswordInput source="password" disabled={!allowedRoles.fields.includes(props.permissions)} />

            <CheckRole permissions={props.permissions} allowed={allowedRoles.fields} deny={<TextInput source="role.name" />}>
                <ReferenceInput source="role_id" reference="role">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </CheckRole>
        </SimpleForm>
    </Edit>
);
