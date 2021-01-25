import React, { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    CreateButton,
    useTranslate,
    TextInput,
    DateField,
    ReferenceInput,
    SelectInput,
    ReferenceField,
    DateInput,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { FilterProps, Filter, TopToolbar, ExportButton } from 'react-admin';
import { ImportButton } from 'react-admin-import-csv';
import { createExporter } from '../../components/ExporterComponent';
import { allowedRoles, scheduleType } from '.';

import TimeField from '../../components/TimeField';
import FullNameField, { FullName } from '../User/FullNameField';
import ScheduleTypeField from './ScheduleTypeField';
import CheckRole from '../../components/CheckRole';
import MyTimeInput from '../../components/MyTimeInput';
import MyDurationInput from '../../components/MyDurationInput';
import { getUserRole } from '../../modules/UserModule';

const Empty = (props) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.schedule.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.schedule.page.invite')}</Typography>
            <CheckRole permissions={getUserRole()} allowed={allowedRoles.create}>
                <CreateButton basePath={props.basePath} />
                <ImportButton {...props} />
            </CheckRole>
        </Box>
    );
};

const exporter = createExporter('schedules', [
    'id',
    'time_start',
    'date',
    'duration',
    'lesson_type',
    'lesson_id',
    'teacher_id',
    'auditory_id',
    'group_id',
]);

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск" source="q" resettable alwaysOn />

        <DateInput source="date" />
        <MyTimeInput source="time_start" options={{ format: 'HH:mm' }} minutesStep={5} resettable />
        <MyDurationInput source="duration" options={{ format: 'HH:mm' }} minutesStep={5} resettable />
        <SelectInput source="lesson_type" choices={scheduleType} resettable />

        <ReferenceInput source="teacher_id" reference="teacher">
            <SelectInput optionText={FullName} resettable />
        </ReferenceInput>

        <ReferenceInput source="group_id" reference="group">
            <SelectInput optionText="name" resettable />
        </ReferenceInput>

        <ReferenceInput source="lesson_id" reference="lesson">
            <SelectInput optionText="name" resettable />
        </ReferenceInput>

        <ReferenceInput source="auditory_id" reference="auditory">
            <SelectInput optionText="name" resettable />
        </ReferenceInput>
    </Filter>
);

const ListActions = (props) => {
    const { className, basePath, total, resource, currentSort } = props;
    return (
        <TopToolbar className={className}>
            <MyFilter context="button" />
            <CheckRole permissions={getUserRole()} allowed={allowedRoles.create}>
                <CreateButton basePath={basePath} />
                <ImportButton {...props} />
            </CheckRole>
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} exporter={exporter} />
        </TopToolbar>
    );
};

export const ScheduleList = (props) => {
    return (
        <List
            // aside={<Aside />}
            empty={<Empty />}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            exporter={exporter}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
            bulkActionButtons={false}
        >
            <Datagrid>
                <TextField source="id" />
                <DateField source="date" />

                <TimeField source="time_start" />

                <ScheduleTypeField />

                <TimeField source="duration" />

                <ReferenceField source="teacher_id" reference="teacher">
                    {/* <TextField source="user.name" /> */}
                    <FullNameField source="user" />
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

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
