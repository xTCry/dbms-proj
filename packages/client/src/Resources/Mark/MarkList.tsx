import React, { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    BulkDeleteButton,
    CreateButton,
    useTranslate,
    Edit,
    SimpleForm,
    required,
    DateField,
    ReferenceInput,
    SelectInput,
    ReferenceField,
    TopToolbar,
    ExportButton,
    downloadCSV,
    Filter,
    FilterProps,
    TextInput,
} from 'react-admin';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { ImportButton } from 'react-admin-import-csv';
import { unparse as convertToCSV } from 'papaparse/papaparse.min';
import { styles } from './MarkCreate';
import ScheduleField, { ScheduleTitle } from '../Schedule/ScheduleField';

const dataRowClick = (id, basePath, record) => {
    console.log('editRecord', id, basePath, record);
    return 'edit'; // record.editable ? 'edit' : 'show';
};

const useStyles = makeStyles({
    ...styles,
    image: {
        width: '60px',
        margin: '0.5rem',
        maxHeight: '10rem',
    },
}) as any;

const BulkActionButtons = (props) => (
    <>
        <BulkDeleteButton {...props} />
    </>
);

const Empty = ({ basePath = '', resource = {} }) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.mark.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.mark.page.invite')}</Typography>
            <CreateButton basePath={basePath} />
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

const ExpandEdit = (props) => {
    const classes = useStyles(props);
    return (
        <Edit {...props} title=" ">
            <SimpleForm undoable={false}>
                <SelectInput
                    source="value"
                    validate={required()}
                    choices={[
                        { id: 'X', name: 'Неявка' },
                        { id: '1', name: '1' },
                        { id: '2', name: '2' },
                        { id: '3', name: '3' },
                        { id: '4', name: '4' },
                        { id: '5', name: '5' },
                    ]}
                    formClassName={classes.part_first}
                />

                <ReferenceInput source="student_id" reference="student">
                    <SelectInput optionText="student_id" />
                </ReferenceInput>

                <ReferenceInput source="schedule_id" reference="schedule">
                    <ScheduleField />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

const ListActions = (props) => {
    const { className, basePath, total, resource, currentSort/* , exporter */ } = props;
    return (
        <TopToolbar className={className}>
            <MyFilter context="button" />
            <CreateButton basePath={basePath} />
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                exporter={exporter}
            />
            <ImportButton {...props} />
        </TopToolbar>
    );
};

const exporter = async (records, fetchRelatedRecords: (data: any, field: string, resource: string) => Promise<any>) => {
    const csv = convertToCSV({
        data: records,
        fields: ['id', 'value', 'student_id', 'schedule_id'],
    });
    downloadCSV(csv, 'marks');
};

const Aside = () => {
    // const { data, ids } = useListContext();
    // console.log(data, ids);
    
    return (
        <div style={{ width: 200, margin: '1em' }}>
            <Typography variant="h6">Статистика отметок</Typography>
            <Typography variant="body2">
                Помещаемость: ...{/* ids.map((id) => data[id]).reduce((sum, post) => sum + post.views, 0) */}
            </Typography>
        </div>
    );
};

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        
        <ReferenceInput
            source="student_id"
            reference="student"
            sort={{ field: 'id', order: 'ASC' }}
        >
            <SelectInput optionText="student_id" />
        </ReferenceInput>

        <ReferenceInput
            source="schedule_id"
            reference="schedule"
            sort={{ field: 'id', order: 'ASC' }}
        >
            <SelectInput optionText={ScheduleTitle} />
        </ReferenceInput>
    </Filter>
);
const postRowStyle = (record, index) => ({
    backgroundColor: record.value == 'X' ? '#795f00' : undefined,
});

export const MarkList = (props) => {
    return (
        <List
            {...props}
            exporter={exporter}
            // aside={<Aside />}
            empty={<Empty />}
            sort={{ field: 'id', order: 'DESC' }}
            bulkActionButtons={false}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
        >
            <Datagrid rowStyle={postRowStyle} rowClick={dataRowClick} expand={<ExpandEdit />}>
                <TextField source="id" />
                <TextField source="value" />
                <DateField source="date" />

                <ReferenceField source="student_id" reference="student">
                    <TextField source="student_id" />
                </ReferenceField>

                <ReferenceField source="schedule_id" reference="schedule">
                    <ScheduleField />
                </ReferenceField>

                <EditButton label="" />
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
