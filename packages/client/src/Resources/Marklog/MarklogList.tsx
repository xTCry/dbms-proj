import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    useTranslate,
    DateField,
    ReferenceField,
    TopToolbar,
    ExportButton,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { createExporter } from '../../components/ExporterComponent';

const Empty = (props) => {
    const translate = useTranslate();
    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.mark_log.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.mark_log.page.invite')}</Typography>
        </Box>
    );
};

const ListActions = (props) => {
    const { className, total, resource, currentSort } = props;
    return (
        <TopToolbar className={className}>
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} exporter={exporter} />
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
