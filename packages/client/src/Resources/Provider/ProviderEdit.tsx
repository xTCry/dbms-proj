import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.vendor}"` : ''}</span>;
};

export const ProviderEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <TextInput source="vendor" validate={required()} />
            <TextInput source="city" validate={required()} />
            <TextInput source="street_home" validate={required()} />
            <TextInput source="telefone" validate={required()} />
        </SimpleForm>
    </Edit>
);
