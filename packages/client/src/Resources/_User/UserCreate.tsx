import React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, required, ReferenceInput, SelectInput, DateInput } from 'react-admin';
// import PhoneInput from 'react-phone-number-input'
// import 'react-phone-number-input/style.css'

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="login" autoFocus validate={required()} />
            <TextInput source="name" validate={required()} />
            <TextInput source="last_name" validate={required()} />
            <TextInput source="second_name" />
            <DateInput source="personal_birthday" validate={required()} />
            <TextInput source="personal_address" validate={required()} />
            <TextInput source="personal_telephone" validate={required()} />

            <PasswordInput source="password" validate={required()} />
            <ReferenceInput source="role_id" reference="role">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
