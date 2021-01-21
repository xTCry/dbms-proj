import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';
import { allowedRoles } from '.';
import CheckRole from '../../components/CheckRole';

export const SpecialtyList = ({ permissions, ...props }) => {
    return (
        <List exporter={false} {...props} sort={{ field: 'id', order: 'DESC' }} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="name" />

                <ReferenceField source="kafedra_id" reference="kafedra">
                    <TextField source="name" />
                </ReferenceField>

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
