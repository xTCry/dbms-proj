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
} from 'react-admin';
import { makeStyles, Typography, Box } from '@material-ui/core';

import { styles } from './GroupCreate';
import { GroupFilter } from './GroupFilter';

const dataRowClick = (id, basePath, record) => {
    console.log('editRecord', record);
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
                {translate('resources.group.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.group.page.invite')}</Typography>
            <CreateButton basePath={basePath} />
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

const ExpandGroupEdit = (props) => {
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

export const GroupList = (props) => {
    return (
        <List
            exporter={false}
            // aside={<Aside />}
            empty={<Empty />}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            filters={<GroupFilter />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid rowClick={dataRowClick} expand={<ExpandGroupEdit />}>
                <TextField source="name" />
                <DateField source="date_formation" />
                <ReferenceField source="specialty_id" reference="specialty">
                    <TextField source="name" />
                </ReferenceField>
                <EditButton label="" />
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
