import React from 'react';
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
    TextInput,
    required,
    DateInput,
    DateField,
    ReferenceInput,
    SelectInput,
    ReferenceField,
    NumberField,
    NumberInput,
} from 'react-admin';
import { makeStyles, Typography, Box } from '@material-ui/core';

import { styles } from './ScheduleCreate';

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
                {translate('resources.schedule.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.schedule.page.invite')}</Typography>
            <CreateButton basePath={basePath} />
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

const ExpandEdit = (props) => {
    const classes = useStyles();
    return (
        <Edit {...props} title=" ">
            <SimpleForm undoable={false}>
                <DateInput source="date" formClassName={classes.part_first} />
                <TextInput
                    type="time"
                    defaultValue="8:30"
                    inputProps={{ step: 300 }}
                    InputLabelProps={{ shrink: true }}
                    source="time_start"
                />
                <NumberInput source="duration" step={300} />
                <TextInput source="lesson_type" />

                <ReferenceInput source="teacher_id" reference="teacher">
                    <SelectInput optionText="user.name" />
                </ReferenceInput>

                <ReferenceInput source="group_id" reference="group">
                    <SelectInput optionText="name" />
                </ReferenceInput>

                <ReferenceInput source="lesson_id" reference="lesson">
                    <SelectInput optionText="name" />
                </ReferenceInput>

                <ReferenceInput source="auditory_id" reference="auditory">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

export const ScheduleList = (props) => {
    return (
        <List
            exporter={false}
            // aside={<Aside />}
            empty={<Empty />}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid rowClick={dataRowClick} expand={<ExpandEdit />}>
                <DateField source="date" />
                <DateField source="time_start" />

                <TextField source="lesson_type" />
                <NumberField source="duration" />
                
                <ReferenceField source="teacher_id" reference="teacher">
                    <TextField source="user.name" />
                </ReferenceField>

                <ReferenceField source="lesson_id" reference="lesson">
                    <TextField source="name" />
                </ReferenceField>

                <ReferenceField source="group_id" reference="group">
                    <TextField source="name" />
                </ReferenceField>

                <ReferenceField source="auditory_id" reference="auditory">
                    <TextField source="name" />
                </ReferenceField>

                <EditButton label="" />
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
