import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps, required, DateInput } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.model.model}"` : ''}</span>;
};

export const TelefoneEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <DateInput source="date_issues" validate={required()} />

            <ReferenceInput source="model_id" reference="model" validate={required()}>
                <SelectInput optionText="model" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
