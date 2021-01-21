import React, { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    CreateButton,
    useTranslate,
    Edit,
    SimpleForm,
    TextInput,
    required,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { FilterProps, Filter, TopToolbar, ExportButton } from 'react-admin';
import { ImportButton } from 'react-admin-import-csv';
import { createExporter } from '../../components/ExporterComponent';
import CheckRole from '../../components/CheckRole';

import { allowedRoles } from '.';

const Empty = ({ basePath = '', resource = {} }) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.kafedra.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.kafedra.page.invite')}</Typography>
            <CreateButton basePath={basePath} />
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

const ExpandEdit = ({ permissions, ...props }: any) => {
    return (
        <Edit {...props} title=" ">
            <SimpleForm undoable={false}>
                <TextInput source="name" validate={required()} />
            </SimpleForm>
        </Edit>
    );
};

const exporter = createExporter('kafedra', ['id', 'name']);

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск" source="q" resettable alwaysOn />
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

export const KafedraList = ({ permissions, ...props }) => {
    return (
        <List
            empty={<Empty />}
            sort={{ field: 'id', order: 'DESC' }}
            exporter={exporter}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
            bulkActionButtons={false}
            {...props}
        >
            <Datagrid expand={<ExpandEdit />}>
                <TextField source="name" />

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
