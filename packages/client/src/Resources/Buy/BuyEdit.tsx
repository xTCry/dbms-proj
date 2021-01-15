import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const BuyEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="component_id" /* disabled validate={required()} */ />
            <TextInput source="maker_id" /* disabled validate={required()} */ />
            <TextInput source="buy_price" /* disabled validate={required()} */ />
            <TextInput source="quantity" /* disabled validate={required()} */ />
            <TextInput source="date_buy" /* disabled validate={required()} */ />

            {/* <ReferenceInput source="provider_id" reference="provider">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="component_id" reference="component">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Edit>
);
