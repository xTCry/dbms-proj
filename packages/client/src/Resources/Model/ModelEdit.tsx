import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.model}"` : ''}</span>;
};

export const ModelEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="model" validate={required()} />

            <ReferenceInput source="brand_id" reference="brand" validate={required()}>
                <SelectInput optionText="brand" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
