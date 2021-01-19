import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.graphic_work}"` : ''}</span>;
};

export const GraphicEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <TextInput source="graphic_work" validate={required()} />
            <TextInput source="graphic_hours" validate={required()} />
        </SimpleForm>
    </Edit>
);
