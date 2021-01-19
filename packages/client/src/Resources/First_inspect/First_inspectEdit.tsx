import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.date_inspect}"` : ''}</span>;
};

export const First_inspectEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <TextInput source="visible_defects" validate={required()} />
            <TextInput source="comment_client" validate={required()} />
            <TextInput source="date_inspect" validate={required()} />
        </SimpleForm>
    </Edit>
);
