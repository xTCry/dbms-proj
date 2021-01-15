import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const BuyList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="component_id" />
                <TextField source="maker_id" />
                <TextField source="buy_price" />
                <TextField source="quantity" />
                <TextField source="date_buy" />

                {/* <ReferenceField source="provider_id" reference="provider">
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
