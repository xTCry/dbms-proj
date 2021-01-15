import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const UsersList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="surname" />
                <TextField source="name" />
                <TextField source="mid_name" />
                <TextField source="photo_employee" />
                <TextField source="graphic_id" />
                <TextField source="position_id" />
                <TextField source="login" />
                <TextField source="password" />

                {/* <ReferenceField source="graphic_id" reference="graphic">
                    <TextField source="name" /> 
                </ReferenceField> */}

                {/* <ReferenceField source="dolzhnost_id" reference="dolzhnost">
                    <TextField source="name" /> 
                </ReferenceField> */}

                <EditButton />
            </Datagrid>
        </List>
    );
};
