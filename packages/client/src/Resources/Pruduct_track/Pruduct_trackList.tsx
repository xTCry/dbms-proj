import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField, DateField, NumberField } from 'react-admin';

export const Pruduct_trackList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <NumberField source="quantity" />
                <DateField source="date_taken" />

                <ReferenceField source="order_id" reference="order">
                    <TextField source="client.name" />
                </ReferenceField>

                <ReferenceField source="component_id" reference="component">
                    <TextField source="name_component" />
                </ReferenceField>

                <EditButton />
            </Datagrid>
        </List>
    );
};
