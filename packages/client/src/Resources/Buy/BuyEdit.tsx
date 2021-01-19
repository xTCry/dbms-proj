import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps, DateInput, required, NumberInput } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `Изменение для "${record.date_buy}"` : ''}</span>;
};

export const BuyEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <NumberInput source="buy_price" validate={required()} />
            <NumberInput source="quantity" validate={required()} />
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
