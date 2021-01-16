import React from 'react';
import { Create, PasswordInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const UsersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="login" autoFocus validate={required()} />
            <PasswordInput source="password" />

            <TextInput source="surname" validate={required()} />
            <TextInput source="name" validate={required()} />
            <TextInput source="mid_name" validate={required()} />

            <TextInput source="photo_employee" validate={required()} />

            <ReferenceInput source="graphic_id" reference="graphic" validate={required()}>
                <SelectInput optionText="graphic_work" />
            </ReferenceInput>

            <ReferenceInput source="position_id" reference="dolzhnost" validate={required()}>
                <SelectInput optionText="position" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
