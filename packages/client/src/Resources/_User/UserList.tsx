import React from 'react';
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';
import { UserRole } from '../../types';
import AvatarField from '../Users/AvatarField';
// import UserLinkField from './UserLinkField';

export const UserList = (props) => {
    // const translate = useTranslate();
    return (
        <List exporter={false} perPage={25} {...props}>
            <Datagrid optimized rowClick="edit">
                {/* <UserLinkField /> */}
                <AvatarField size={'30'} />
                <TextField source="id" />
                <TextField source="login" />
                <TextField source="name" />
                <TextField source="last_name" />
                <TextField source="second_name" />

                <ReferenceField source="role_id" reference="role" link={false}>
                    <TextField source="name" /> 
                </ReferenceField>

                <EditButton />
            </Datagrid>
        </List>
    );
};
