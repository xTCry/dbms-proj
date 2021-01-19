import React from 'react';
import { Create, SimpleForm, ReferenceInput, SelectInput, required } from 'react-admin';

export const Headman2groupCreate = (props) => {
    return (
        <Create title="Добавить старосту группы" {...props}>
            <SimpleForm>
                <ReferenceInput source="student_id" reference="student" validate={required()}>
                    <SelectInput optionText="user.name" />
                </ReferenceInput>

                <ReferenceInput source="group_id" reference="group" validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
