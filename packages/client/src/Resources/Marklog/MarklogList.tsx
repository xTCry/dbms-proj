import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    CreateButton,
    useTranslate,
    DateField,
    ReferenceField,
    TopToolbar,
    ExportButton,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { ImportButton } from 'react-admin-import-csv';
import { createExporter } from '../../components/ExporterComponent';
import CheckRole from '../../components/CheckRole';
import { allowedRoles } from '.';

const Empty = ({ basePath = '', resource = {}, permissions }: any) => {
    const translate = useTranslate();
    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.mark_log.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.mark_log.page.invite')}</Typography>
            <CheckRole permissions={permissions} allowed={allowedRoles.create}>
                <CreateButton basePath={basePath} />
            </CheckRole>
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

const ListActions = (props) => {
    const { className, basePath, total, resource, currentSort /* , exporter */ } = props;
    return (
        <TopToolbar className={className}>
            <CreateButton basePath={basePath} />
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} exporter={exporter} />
            <ImportButton {...props} />
        </TopToolbar>
    );
};

const exporter = createExporter('mark_log', ['id', 'changed_date', 'last_value', 'new_value', 'mark_id']);

const postRowStyle = (record, index) => ({
    backgroundColor: record.new_value == 'X' ? '#795f00' : undefined,
});

export const MarklogList = (props) => {
    return (
        <List
            empty={<Empty />}
            sort={{ field: 'id', order: 'DESC' }}
            bulkActionButtons={false}
            exporter={exporter}
            actions={<ListActions />}
            {...props}
        >
            <Datagrid rowStyle={postRowStyle}>
                <TextField source="id" />
                <DateField source="changed_date" />
                <TextField source="last_value" />
                <TextField source="new_value" />

                <ReferenceField source="mark_id" reference="mark">
                    <DateField source="date" />
                </ReferenceField>
            </Datagrid>
        </List>
    );
};
