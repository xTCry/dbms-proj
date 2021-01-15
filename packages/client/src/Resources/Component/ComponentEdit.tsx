import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const ComponentEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="telefone_id" /* disabled validate={required()} */ />
            <TextInput source="maker_id" /* disabled validate={required()} */ />
            <TextInput source="name_component" /* disabled validate={required()} */ />
            <TextInput source="price_install" /* disabled validate={required()} */ />
            <TextInput source="price_client" /* disabled validate={required()} */ />

            {/* <ReferenceInput source="maker_id" reference="maker">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="telefone_id" reference="telefone">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Edit>
);
