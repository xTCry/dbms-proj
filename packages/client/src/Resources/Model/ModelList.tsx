import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const ModelList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="model" />

                <ReferenceField source="brand_id" reference="brand">
                    <TextField source="brand" />
                </ReferenceField>

                <EditButton />
            </Datagrid>
        </List>
    );
};
