import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField, DateField } from 'react-admin';

export const OrderList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />

                <DateField source="date_accept" />
                <DateField source="date_issues" />
                <TextField source="price_repair" />

                <ReferenceField source="telefone_id" reference="telefone">
                    <TextField source="model.model" />
                </ReferenceField>

                <ReferenceField source="status_id" reference="status">
                    <TextField source="status_done" />
                </ReferenceField>

                <ReferenceField source="operator_id" reference="users">
                    <TextField source="name" />
                </ReferenceField>

                <ReferenceField source="engineer_id" reference="users">
                    <TextField source="name" />
                </ReferenceField>

                <ReferenceField source="first_inspect_id" reference="first_inspect">
                    <TextField source="comment_client" />
                </ReferenceField>

                <ReferenceField source="second_inspect_id" reference="second_inspect">
                    <TextField source="fault" />
                </ReferenceField>

                <ReferenceField source="client_id" reference="client">
                    <TextField source="name" />
                </ReferenceField>

                <EditButton label="" />
            </Datagrid>
        </List>
    );
};
