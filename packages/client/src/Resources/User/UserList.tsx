import React, { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    ReferenceField,
    FilterProps,
    Filter,
    TextInput,
    ReferenceInput,
    SelectInput,
    TopToolbar,
    CreateButton,
    ExportButton,
    ShowButton,
} from 'react-admin';
import { ImportButton } from 'react-admin-import-csv';
import AvatarField from './AvatarField';
import { createExporter } from '../../components/ExporterComponent';
import { allowedRoles } from '.';
import CheckRole from '../../components/CheckRole';

const exporter = createExporter('users', [
    'id',
    'login',
    'name',
    'last_name',
    'second_name',
    'role_id',
    'personal_address',
    'personal_telephone',
    'personal_birthday',
]);

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск" source="q" resettable alwaysOn />

        <ReferenceInput source="role_id" reference="role" sort={{ field: 'id', order: 'ASC' }}>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const ListActions = (props) => {
    const { className, basePath, total, resource, currentSort /* , exporter */ } = props;
    return (
        <TopToolbar className={className}>
            <MyFilter context="button" />
            <CreateButton basePath={basePath} />
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} exporter={exporter} />
            <ImportButton {...props} />
        </TopToolbar>
    );
};

export const UserList = (props) => {
    return (
        <List
            {...props}
            exporter={exporter}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
            perPage={25}
            bulkActionButtons={false}
        >
            <Datagrid>
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

                <CheckRole
                    permissions={props.permissions}
                    allowed={allowedRoles.edit}
                    deny={<EditButton label="" disabled />}
                >
                    <EditButton />
                </CheckRole>
                <CheckRole
                    permissions={props.permissions}
                    allowed={allowedRoles.show}
                    deny={<ShowButton label="" disabled />}
                >
                    <ShowButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
