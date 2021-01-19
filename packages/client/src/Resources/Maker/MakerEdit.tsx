import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.maker}"` : ''}</span>;
};

export const MakerEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <TextInput source="maker" validate={required()} />
            <TextInput source="country_make" validate={required()} />
        </SimpleForm>
    </Edit>
);
