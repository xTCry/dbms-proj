import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    ReferenceField,
    BulkDeleteButton,
    CreateButton,
    useTranslate,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    required,
    ReferenceManyField,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';

import TeacherFilter from './TeacherFilter';
import { UserRole } from '../../types';
import FullNameField from '../User/FullNameField';
import CheckRole from '../../components/CheckRole';

const allowedRoles = [UserRole.ADMIN, UserRole.DEKAN];

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

const ExpandEdit = (props: any) => {
    return (
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
    );
};

export const TeacherList = (props) => {
    const translate = useTranslate();
    return (
        <List
            exporter={false}
            empty={<Empty />}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            filters={<TeacherFilter />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid
                rowClick={(id, basePath, record) => (allowedRoles.includes(props.permissions) ? 'edit' : 'show')}
                expand={allowedRoles.includes(props.permissions) ? <ExpandEdit /> : null}
            >
                <ReferenceField source="user_id" reference="user">
                    <FullNameField />
                </ReferenceField>

                <ReferenceManyField
                    label={translate('resources.teacher.fields.lessons')}
                    reference="teacher2lesson"
                    target="teacher_id"
                    sortable={false}
                >
                    <Datagrid>
                        <TextField source="lesson.name" label={translate('resources.teacher.fields.lesson_name')} />
                    </Datagrid>
                </ReferenceManyField>

                <TextField source="experience" />

                <CheckRole permissions={props.permissions} allowed={allowedRoles} deny={<EditButton disabled />}>
                    <EditButton />
                </CheckRole>
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
