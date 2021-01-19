import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.position}"` : ''}</span>;
};

export const DolzhnostEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <TextInput source="position" validate={required()} />
        </SimpleForm>
    </Edit>
);
