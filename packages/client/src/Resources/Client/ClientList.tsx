import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const ClientList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="surname" />
                <TextField source="name" />
                <TextField source="mid_name" />
                <TextField source="mob_telefone" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
