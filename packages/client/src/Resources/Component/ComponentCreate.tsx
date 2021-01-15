import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const ComponentCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" autoFocus /* validate={required()} */ />
            <TextInput source="telefone_id" /* validate={required()} */ />
            <TextInput source="maker_id" /* validate={required()} */ />
            <TextInput source="name_component" /* validate={required()} */ />
            <TextInput source="price_install" /* validate={required()} */ />
            <TextInput source="price_client" /* validate={required()} */ />

            {/* <ReferenceInput source="maker_id" reference="maker">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

            {/* <ReferenceInput source="telefone_id" reference="telefone">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}

        </SimpleForm>
    </Create>
);
