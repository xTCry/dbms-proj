import React from 'react';
import { List, Datagrid, TextField, EditButton, DateField } from 'react-admin';

export const Second_inspectList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="fault" />
                <TextField source="price_diagnose" />
                <DateField source="date_inspect" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
