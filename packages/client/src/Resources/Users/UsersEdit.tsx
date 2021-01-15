import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, EditProps } from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const UsersEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" /* disabled validate={required()} */ />
            <TextInput source="surname" /* disabled validate={required()} */ />
            <TextInput source="name" /* disabled validate={required()} */ />
            <TextInput source="mid_name" /* disabled validate={required()} */ />
            <TextInput source="photo_employee" /* disabled validate={required()} */ />
            <TextInput source="graphic_id" /* disabled validate={required()} */ />
            <TextInput source="position_id" /* disabled validate={required()} */ />
            <TextInput source="login" /* disabled validate={required()} */ />
            <TextInput source="password" /* disabled validate={required()} */ />

            {/* <ReferenceInput source="graphic_id" reference="graphic">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="dolzhnost_id" reference="dolzhnost">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Edit>
);
