import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

export const First_inspectList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="visible_defects" />
                <TextField source="comment_client" />
                <TextField source="date_inspect" />
                <EditButton />
            </Datagrid>
        </List>
    );
};
