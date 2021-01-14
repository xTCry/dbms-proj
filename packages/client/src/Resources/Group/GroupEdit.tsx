import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    SelectInput,
    ReferenceInput,
} from 'react-admin';

const Title = ({ record = { title: 'None' } } = {}) => {
    return <span>Студент {record ? `"${record.title}"` : ''}</span>;
};

export const GroupEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" validate={required()} />

            <ReferenceInput source="user_id" reference="user">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
