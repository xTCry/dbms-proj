import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const ComponentList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="telefone_id" />
                <TextField source="maker_id" />
                <TextField source="name_component" />
                <TextField source="price_install" />
                <TextField source="price_client" />

                {/* <ReferenceField source="maker_id" reference="maker">
                    <TextField source="name" /> 
                </ReferenceField> */}

                {/* <ReferenceField source="telefone_id" reference="telefone">
                    <TextField source="name" /> 
                </ReferenceField> */}

                <EditButton />
            </Datagrid>
        </List>
    );
};
