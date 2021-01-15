import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const ProviderEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="vendor" /* disabled validate={required()} */ />
            <TextInput source="city" /* disabled validate={required()} */ />
            <TextInput source="street_home" /* disabled validate={required()} */ />
            <TextInput source="telefone" /* disabled validate={required()} */ />
        </SimpleForm>
    </Edit>
);
