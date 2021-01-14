import React from 'react';
import {
    List,
    Datagrid,
    DateField,
    TextField,
    EditButton,
    // ShowButton,
    // SelectField,
    // ImageField,
    ReferenceField,
    BulkDeleteButton,
    CreateButton,
    useTranslate,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    NumberField,
    required,
} from 'react-admin';
import {
    makeStyles,
    Typography,
    Box,
} from '@material-ui/core';

import { styles } from './TeacherCreate';
import StudentFilter from './TeacherFilter';
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
                {translate('resources.orders.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.orders.page.invite')}</Typography>
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
                    <TextInput source="experience" validate={required()} />
                    <ReferenceInput
                        source="user_id"
                        reference="user"
                        validate={required()}
                        filter={{ role_id: UserRole.TEACHER }}
                    >
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                </SimpleForm>
            </Edit>
        )
    );
};

export const StudentList = ({ permissions, ...props }) => {
    return (
        <List
            exporter={false}
            empty={<Empty />}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            filters={<StudentFilter />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid rowClick={dataRowClick} expand={<ExpandEdit />}>
                <TextField source="experience" />

                <ReferenceField source="user_id" reference="user">
                    <TextField source="last_name" />
                </ReferenceField>

                {[UserRole.ADMIN, UserRole.DEKAN].includes(permissions) && <EditButton />}
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
