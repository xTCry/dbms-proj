import React from 'react';
import { Create, SimpleForm, ReferenceInput, SelectInput, required } from 'react-admin';

export const Teacher2lessonCreate = (props) => {
    return (
        <Create title="Добавить дисциплину преп." {...props}>
            <SimpleForm>
                <ReferenceInput source="teacher_id" reference="teacher" validate={required()}>
                    <SelectInput optionText="user.name" />
                </ReferenceInput>

                <ReferenceInput source="lesson_id" reference="lesson" validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
