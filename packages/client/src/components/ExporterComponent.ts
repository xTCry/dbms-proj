import jsonExport from 'jsonexport/dist';
import { Exporter } from 'react-admin';
import { json2xml } from 'xml-js';
import { objFilter } from '../Providers/DataProvider';
import { downloadAsCSV, downloadAsJSON, downloadAsXML } from './downloadFile';

export const createExporter = (filename, headers): Exporter => async (data: any) => {
    const forExport = data.map((field) => {
        return objFilter(field, headers);
    });

    const json = JSON.stringify({ data: forExport }, null, 2);
    downloadAsXML(json2xml(json, { compact: true, ignoreComment: true, spaces: 4 }), filename);
    downloadAsJSON(json, filename);
    jsonExport(forExport, { headers }, (err, csv) => {
        downloadAsCSV(csv, filename);
    });
};
