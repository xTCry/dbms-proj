import React from 'react';
import { List, Datagrid, TextField, EditButton, ShowButton, ReferenceField } from 'react-admin';
import { allowedRoles } from '.';
import CheckRole from '../../components/CheckRole';
import FullNameField from '../User/FullNameField';

export const StudentList = (props) => {
    return (
        <List exporter={false} {...props} sort={{ field: 'id', order: 'DESC' }} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="student_id" />

                <ReferenceField source="user_id" reference="user">
                    <FullNameField />
                </ReferenceField>

                <ReferenceField source="group_id" reference="group">
                    <TextField source="name" />
                </ReferenceField>

                <ReferenceField source="user.role_id" reference="role" link={false}>
                    <TextField source="name" />
                </ReferenceField>

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
                <CheckRole permissions={props.permissions} allowed={allowedRoles.show}>
                    <ShowButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
