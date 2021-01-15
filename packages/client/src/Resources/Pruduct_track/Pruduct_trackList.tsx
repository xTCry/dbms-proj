import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const Pruduct_trackList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="order_id" />
                <TextField source="component_id" />
                <TextField source="quantity" />
                <TextField source="date_taken" />

                {/* <ReferenceField source="order_id" reference="order">
                    <TextField source="name" /> 
                </ReferenceField> */}

                {/* <ReferenceField source="component_id" reference="component">
                    <TextField source="name" /> 
                </ReferenceField> */}

                <EditButton />
            </Datagrid>
        </List>
    );
};
