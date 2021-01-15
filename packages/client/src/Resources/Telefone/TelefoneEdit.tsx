import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const TelefoneEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="model_id" /* disabled validate={required()} */ />
            <TextInput source="date_issues" /* disabled validate={required()} */ />

            {/* <ReferenceInput source="model_id" reference="model">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Edit>
);
