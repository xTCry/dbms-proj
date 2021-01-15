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
    required,
    DateField,
    ReferenceInput,
    SelectInput,
    ReferenceField,
} from 'react-admin';
import { makeStyles, Typography, Box } from '@material-ui/core';

import { styles } from './MarkCreate';

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
    const classes = useStyles();
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
                    <SelectInput optionText="date" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

export const MarkList = (props) => {
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
                <TextField source="value" />
                <DateField source="date" />
                
                <ReferenceField source="student_id" reference="student">
                    <TextField source="student_id" />
                </ReferenceField>

                <EditButton label="" />
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
