import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const OrderList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="telefone_id" />
                <TextField source="status_id" />
                <TextField source="operator_id" />
                <TextField source="engineer_id" />
                <TextField source="first_inspect_id" />
                <TextField source="second_inspect_id" />
                <TextField source="client_id" />
                <TextField source="date_accept" />
                <TextField source="date_issues" />
                <TextField source="price_repair" />

                {/* <ReferenceField source="telefone_id" reference="telefone">
                    <TextField source="name" /> 
                </ReferenceField> */}

                {/* <ReferenceField source="status_id" reference="status">
                    <TextField source="name" /> 
                </ReferenceField> */}

                {/* <ReferenceField source="users_id" reference="users">
                    <TextField source="name" /> 
                </ReferenceField> */}

                {/* <ReferenceField source="first_inspect_id" reference="first_inspect">
                    <TextField source="name" /> 
                </ReferenceField> */}

                {/* <ReferenceField source="second_inspect_id" reference="second_inspect">
                    <TextField source="name" /> 
                </ReferenceField> */}

                {/* <ReferenceField source="client_id" reference="client">
                    <TextField source="name" /> 
                </ReferenceField> */}

                <EditButton />
            </Datagrid>
        </List>
    );
};
