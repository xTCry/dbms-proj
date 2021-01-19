import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField, DateField } from 'react-admin';

export const TelefoneList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <DateField source="date_issues" />

                <ReferenceField source="model_id" reference="model">
                    <TextField source="model" />
                </ReferenceField>

                <EditButton />
            </Datagrid>
        </List>
    );
};
