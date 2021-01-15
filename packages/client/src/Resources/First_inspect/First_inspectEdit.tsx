import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const First_inspectEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="visible_defects" /* disabled validate={required()} */ />
            <TextInput source="comment_client" /* disabled validate={required()} */ />
            <TextInput source="date_inspect" /* disabled validate={required()} */ />
        </SimpleForm>
    </Edit>
);
