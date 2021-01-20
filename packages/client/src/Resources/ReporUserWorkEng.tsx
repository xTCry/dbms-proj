import React from 'react';
import { List, Datagrid, TextField, NumberField } from 'react-admin';
import icon from '@material-ui/icons/PeopleTwoTone';
import jsonExport from 'jsonexport/dist';
import { json2xml } from 'xml-js';
import { UserRole } from '../types';
import { downloadAsCSV, downloadAsJSON, downloadAsXML } from '../downloadFile';

export const reporUserWorkEng = (permissions) => ({
    list: [
        UserRole.ADMIN,
        UserRole.ADMIN_WAREHOUSE,
        UserRole.ENGEENER_LEAD,
        UserRole.ENGEENER,
        UserRole.OPERATOR,
    ].includes(permissions)
        ? ReporUserWorkEngList
        : null,

    icon,
    name: 'report-workload_engineers',
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
            headers: ['id', 'surname', 'name', 'mid_name', 'position', 'work_tasks'],
        },
        (err, csv) => {
            downloadAsCSV(csv, 'report-workload_engineers');
        }
    );
};

export const ReporUserWorkEngList = (props) => {
    return (
        <List
            title={'Отчет загруженности инженеров'}
            exporter={exporter}
            perPage={99}
            {...props}
            bulkActionButtons={false}
        >
            <Datagrid>
                <TextField source="id" />

                <TextField source="surname" />
                <TextField source="name" />
                <TextField source="mid_name" />
                <TextField source="position" />
                <NumberField source="work_tasks" />
            </Datagrid>
        </List>
    );
};
