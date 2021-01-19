import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

export const GraphicList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="graphic_work" />
                <TextField source="graphic_hours" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
