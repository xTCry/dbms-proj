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
    DateInput,
    DateField,
    ReferenceInput,
    SelectInput,
    ReferenceField,
} from 'react-admin';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { FilterProps, Filter, TopToolbar, ExportButton } from 'react-admin';
import { ImportButton } from 'react-admin-import-csv';
import { createExporter } from '../../components/ExporterComponent';
import CheckRole from '../../components/CheckRole';

import { styles } from './GroupCreate';
import { allowedRoles } from '.';
import { getUserRole } from '../../modules/UserModule';

const useStyles = makeStyles({
    ...styles,
    image: {
        width: '60px',
        margin: '0.5rem',
        maxHeight: '10rem',
    },
}) as any;

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск" source="q" resettable alwaysOn />

        <TextInput source="name" resettable />
        <DateInput source="date_formation" resettable />

        <ReferenceInput source="specialty_id" reference="specialty">
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
                <CreateButton basePath={props.basePath} />
                <ImportButton {...props} />
            </CheckRole>
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} exporter={exporter} />
        </TopToolbar>
    );
};

const Empty = (props) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.group.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.group.page.invite')}</Typography>
            <CheckRole permissions={getUserRole()} allowed={allowedRoles.create}>
                <CreateButton basePath={props.basePath} />
                <ImportButton {...props} />
            </CheckRole>
        </Box>
    );
};

const ExpandEdit = (props) => {
    const classes = useStyles();
    return (
        <Edit {...props} title=" ">
            <SimpleForm undoable={false}>
                <TextInput source="name" formClassName={classes.part_first} validate={required()} />
                <DateInput source="date_formation" validate={required()} />
                <ReferenceInput source="specialty_id" reference="specialty">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

const exporter = createExporter('group', ['id', 'name', 'date_formation', 'specialty_id']);

export const GroupList = (props) => {
    return (
        <List
            // aside={<Aside />}
            empty={<Empty />}
            sort={{ field: 'id', order: 'DESC' }}
            bulkActionButtons={false}
            exporter={exporter}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
            {...props}
        >
            <Datagrid expand={allowedRoles.edit.includes(props.permissions) ? <ExpandEdit /> : null}>
                <TextField source="name" />
                <DateField source="date_formation" />
                <ReferenceField source="specialty_id" reference="specialty">
                    <TextField source="name" />
                </ReferenceField>

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
