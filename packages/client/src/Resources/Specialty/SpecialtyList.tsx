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
    ReferenceField,
} from 'react-admin';
import { makeStyles, Typography, Box } from '@material-ui/core';

import { styles } from './SpecialtyCreate';
import SpecialtyFilter from './SpecialtyFilter';
import { UserRole } from '../../types';

const dataRowClick = (id, basePath, record) => 'edit'; // record.editable ? 'edit' : 'show';

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
                {translate('resources.lesson.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.lesson.page.invite')}</Typography>
            <CreateButton basePath={basePath} />
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

const ExpandEdit = ({ permissions, ...props }: any) => {
    const classes = useStyles();
    return (
        [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) && (
            <Edit {...props} title=" ">
                <SimpleForm
                    // form={`order_edit_${props.id}`}
                    undoable={false}
                >
                    <TextInput source="name" validate={required()} />
                </SimpleForm>
            </Edit>
        )
    );
};

export const SpecialtyList = ({ permissions, ...props }) => {
    return (
        <List
            exporter={false}
            empty={<Empty />}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            filters={<SpecialtyFilter />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid rowClick={dataRowClick} expand={<ExpandEdit />}>
                <TextField source="name" />

                <ReferenceField source="kafedra_id" reference="kafedra">
                    <TextField source="name" />
                </ReferenceField>
                {[UserRole.ADMIN, UserRole.DEKAN].includes(permissions) && <EditButton />}
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
