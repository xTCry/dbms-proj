import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.name_component}"` : ''}</span>;
};

export const ComponentEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name_component" validate={required()} />
            <TextInput source="price_install" validate={required()} />
            <TextInput source="price_client" validate={required()} />

            <ReferenceInput source="maker_id" reference="maker" validate={required()}>
                <SelectInput optionText="maker" />
            </ReferenceInput>

            <ReferenceInput source="telefone_id" reference="telefone" validate={required()}>
                <SelectInput optionText="model.model" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
