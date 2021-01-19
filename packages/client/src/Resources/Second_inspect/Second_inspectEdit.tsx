import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps, required, DateInput, NumberInput } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.fault}"` : ''}</span>;
};

export const Second_inspectEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled validate={required()} />
            <TextInput source="fault" validate={required()} />
            <NumberInput source="price_diagnose" validate={required()} />
            <DateInput source="date_inspect" validate={required()} />
        </SimpleForm>
    </Edit>
);
