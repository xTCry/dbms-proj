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
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { ImportButton } from 'react-admin-import-csv';

import { createExporter } from '../../components/ExporterComponent';
import CheckRole from '../../components/CheckRole';
import { allowedRoles } from '.';

const Empty = ({ basePath = '', resource = {} }) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.auditory.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.auditory.page.invite')}</Typography>
            <CreateButton basePath={basePath} />
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

/* const ExpandEdit = ({ permissions, ...props }: any) => {
    return (
        <Edit {...props} title=" ">
            <SimpleForm undoable={false}>
                <TextInput source="name" validate={required()} />
                <TextInput source="corpus" validate={required()} />
            </SimpleForm>
        </Edit>
    );
}; */

const exporter = createExporter('auditories', ['id', 'name', 'corpus']);

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск" source="q" resettable alwaysOn />
        <TextInput source="corpus" />
    </Filter>
);

const ListActions = (props) => {
    const { className, basePath, total, resource, currentSort /* , exporter */ } = props;
    return (
        <TopToolbar className={className}>
            <MyFilter context="button" />
            {/* <CheckRole permissions={props.permissions} allowed={allowedRoles.create}> */}
                <CreateButton basePath={basePath} />
            {/* </CheckRole> */}
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} exporter={exporter} />
            <ImportButton {...props} />
        </TopToolbar>
    );
};

export const AuditoryList = ({ permissions, ...props }) => {
    return (
        <List
            {...props}
            empty={<Empty />}
            sort={{ field: 'id', order: 'DESC' }}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
            bulkActionButtons={false}
        >
            <Datagrid /* expand={<ExpandEdit />} */>
                <TextField source="name" />
                <TextField source="corpus" />

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
