import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const ProviderList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="vendor" />
                <TextField source="city" />
                <TextField source="street_home" />
                <TextField source="telefone" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
