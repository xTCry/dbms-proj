import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField, DateField } from 'react-admin';

export const BuyList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="buy_price" />
                <TextField source="quantity" />
                <DateField source="date_buy" />

                <ReferenceField source="maker_id" reference="provider">
                    <TextField source="vendor" />
                </ReferenceField>

                <ReferenceField source="component_id" reference="component">
                    <TextField source="name_component" />
                </ReferenceField>

                <EditButton />
            </Datagrid>
        </List>
    );
};
