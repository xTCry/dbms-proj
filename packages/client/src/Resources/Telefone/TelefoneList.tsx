import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const TelefoneList = (props) => {
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="model_id" />
                <TextField source="date_issues" />

                {/* <ReferenceField source="model_id" reference="model">
                    <TextField source="name" /> 
                </ReferenceField> */}

                <EditButton />
            </Datagrid>
        </List>
    );
};
