import React, { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    CreateButton,
    useTranslate,
    TextInput,
    TopToolbar,
    ExportButton,
    Filter,
    FilterProps,
    required,
    SimpleForm,
    Edit,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { ImportButton } from 'react-admin-import-csv';

import { createExporter } from '../../components/ExporterComponent';
import CheckRole from '../../components/CheckRole';
import { allowedRoles } from '.';
import { getUserRole } from '../../modules/UserModule';

const Empty = (props) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.auditory.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.auditory.page.invite')}</Typography>
            <CheckRole permissions={getUserRole()} allowed={allowedRoles.create}>
                <CreateButton basePath={props.basePath} />
                <ImportButton {...props} />
            </CheckRole>
        </Box>
    );
};

const ExpandEdit = (props) => {
    return (
        <Edit {...props} title=" ">
            <SimpleForm undoable={false}>
                <TextInput source="name" validate={required()} />
                <TextInput source="corpus" validate={required()} />
            </SimpleForm>
        </Edit>
    );
};

const exporter = createExporter('auditories', ['id', 'name', 'corpus']);

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск" source="q" resettable alwaysOn />
        <TextInput source="corpus" />
    </Filter>
);

const ListActions = (props) => {
    const { className, total, resource, currentSort } = props;
    return (
        <TopToolbar className={className}>
            <MyFilter context="button" />
            <CheckRole permissions={getUserRole()} allowed={allowedRoles.create}>
                <CreateButton basePath={props.basePath} />
                <ImportButton {...props} />
            </CheckRole>
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} exporter={exporter} />
        </TopToolbar>
    );
};

export const AuditoryList = (props) => {
    return (
        <List
            {...props}
            empty={<Empty />}
            sort={{ field: 'id', order: 'DESC' }}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
            bulkActionButtons={false}
        >
            <Datagrid expand={allowedRoles.edit.includes(props.permissions) ? <ExpandEdit /> : null}>
                <TextField source="name" />
                <TextField source="corpus" />

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
