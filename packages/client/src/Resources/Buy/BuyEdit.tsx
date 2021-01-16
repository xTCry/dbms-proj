import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps, DateInput, required } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const BuyEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="buy_price" validate={required()} />
            <TextInput source="quantity" validate={required()} />
            <DateInput source="date_buy" validate={required()} />

            <ReferenceInput source="maker_id" reference="provider">
                <SelectInput optionText="vendor" />
            </ReferenceInput>

            <ReferenceInput source="component_id" reference="component">
                <SelectInput optionText="name_component" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
