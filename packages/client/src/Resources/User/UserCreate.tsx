import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
    required,
    ReferenceInput,
    SelectInput,
    DateInput,
    ImageInput,
    ImageField,
} from 'react-admin';

export const UserCreate = (props) => (
    <Create title="Добавить пользователя" {...props}>
        <SimpleForm>
            <TextInput source="login" autoFocus validate={required()} />
            <TextInput source="name" validate={required()} />
            <TextInput source="last_name" validate={required()} />
            <TextInput source="second_name" />
            <DateInput source="personal_birthday" validate={required()} />
            <TextInput source="personal_address" validate={required()} />
            <TextInput source="personal_telephone" validate={required()} />

            <PasswordInput source="password" validate={required()} />
            <ReferenceInput source="role_id" reference="role" validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>

            <ImageInput source="new_photo" accept="image/*">
                <ImageField source="photo_path" label="Avatar" />
            </ImageInput>
        </SimpleForm>
    </Create>
);
