import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const Title = (props) => {
    const { record } = props;
    return <span>Изменение предмета {record ? `"${record.name}"` : ''}</span>;
};

export const LessonEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);
