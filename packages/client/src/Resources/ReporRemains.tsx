import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import icon from '@material-ui/icons/PeopleTwoTone';
import { UserRole } from '../types';
import jsonExport from 'jsonexport/dist';
import { json2xml } from 'xml-js';
import { downloadAsCSV, downloadAsJSON, downloadAsXML } from '../downloadFile';

export const reporRemains = (permissions) => ({
    list: [
        UserRole.ADMIN,
        UserRole.ADMIN_WAREHOUSE,
        UserRole.ENGEENER_LEAD,
        UserRole.ENGEENER,
        UserRole.OPERATOR,
    ].includes(permissions)
        ? ReporRemainsList
        : null,

    icon,
    name: 'report-remains',
});

const exporter = (fields) => {
    const forExport = fields.map((field) => {
        return field;
    });

    let xmlData = json2xml(forExport, { compact: true, ignoreComment: true, spaces: 4 });
    downloadAsXML(xmlData, 'report-workload_engineers');
    downloadAsJSON(JSON.stringify(forExport, null, 2), 'report-workload_engineers');

    jsonExport(
        forExport,
        {
            headers: ['id', 'name_component', 'quantity_start', 'quantity_after_uses'],
        },
        (err, csv) => {
            downloadAsCSV(csv, 'report-workload_engineers');
        }
    );
};

export const ReporRemainsList = (props) => {
    return (
        <List
            title={'Отчет по остаткам расходных материалов'}
            exporter={exporter}
            perPage={999}
            {...props}
            bulkActionButtons={false}
        >
            <Datagrid>
                <TextField source="id" />

                <TextField source="name_component" />
                <TextField source="quantity_start" />
                <TextField source="quantity_after_uses" emptyText="Не были взяты в работу ни разу" />

                {/* <NumberField source="quantity_after_uses" /> */}
            </Datagrid>
        </List>
    );
};
