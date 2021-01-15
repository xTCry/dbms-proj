import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const Second_inspectEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="fault" /* disabled validate={required()} */ />
            <TextInput source="price_diagnose" /* disabled validate={required()} */ />
            <TextInput source="date_inspect" /* disabled validate={required()} */ />
        </SimpleForm>
    </Edit>
);
