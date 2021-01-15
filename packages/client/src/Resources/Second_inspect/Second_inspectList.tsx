import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const Second_inspectList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="fault" />
                <TextField source="price_diagnose" />
                <TextField source="date_inspect" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
