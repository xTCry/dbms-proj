import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const UsersCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="surname" /* validate={required()} */ />
            <TextInput source="name" /* validate={required()} */ />
            <TextInput source="mid_name" /* validate={required()} */ />
            <TextInput source="photo_employee" /* validate={required()} */ />
            <TextInput source="graphic_id" /* validate={required()} */ />
            <TextInput source="position_id" /* validate={required()} */ />
            <TextInput source="login" /* validate={required()} */ />
            <TextInput source="password" /* validate={required()} */ />

            {/* <ReferenceInput source="graphic_id" reference="graphic">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="dolzhnost_id" reference="dolzhnost">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Create>
);
