import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

import FullNameField from '../User/FullNameField';
import CheckRole from '../../components/CheckRole';
import { allowedRoles } from '.';

export const Teacher2lessonList = (props) => {
    return (
        <List {...props} exporter={false} sort={{ field: 'id', order: 'DESC' }} bulkActionButtons={false}>
            <Datagrid>
                <ReferenceField source="teacher_id" reference="teacher">
                    <FullNameField source="user" />
                </ReferenceField>

                <ReferenceField source="lesson_id" reference="lesson">
                    <TextField source="name" />
                </ReferenceField>

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit} deny={<EditButton disabled />}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
