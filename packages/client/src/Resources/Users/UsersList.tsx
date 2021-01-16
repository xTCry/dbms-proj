import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const UsersList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="login" />

                <TextField source="surname" />
                <TextField source="name" />
                <TextField source="mid_name" />

                <TextField source="photo_employee" />

                <ReferenceField source="graphic_id" reference="graphic">
                    <TextField source="graphic_work" /> 
                </ReferenceField>

                <ReferenceField source="position_id" reference="dolzhnost">
                    <TextField source="position" /> 
                </ReferenceField>

                <EditButton />
            </Datagrid>
        </List>
    );
};
