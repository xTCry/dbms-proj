import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const DolzhnostList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="position" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
