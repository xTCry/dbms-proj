import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    ReferenceField,
    BulkDeleteButton,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    required,
} from 'react-admin';

import TeacherFilter from './Teacher2lessonFilter';
import { UserRole } from '../../types';
import FullNameField from '../User/FullNameField';
import CheckRole from '../../components/CheckRole';

const allowedRoles = [UserRole.ADMIN, UserRole.DEKAN];

const BulkActionButtons = (props) => (
    <>
        <BulkDeleteButton {...props} />
    </>
);

const ExpandEdit = (props: any) => {
    return (
        <Edit {...props} title=" ">
            <SimpleForm
                // form={`order_edit_${props.id}`}
                undoable={false}
            >
                <ReferenceInput source="teacher_id" reference="teacher" validate={required()}>
                    <SelectInput optionText="user.name" />
                </ReferenceInput>

                <ReferenceInput source="lesson_id" reference="lesson" validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

export const Teacher2lessonList = (props) => {
    return (
        <List
            exporter={false}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            filters={<TeacherFilter />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid
                rowClick={(id, basePath, record) => (allowedRoles.includes(props.permissions) ? 'edit' : 'show')}
                expand={allowedRoles.includes(props.permissions) ? <ExpandEdit /> : null}
            >
                <ReferenceField source="teacher_id" reference="teacher">
                    <TextField source="user.name" />
                </ReferenceField>

                <ReferenceField source="lesson_id" reference="lesson">
                    <TextField source="name" />
                </ReferenceField>

                <CheckRole permissions={props.permissions} allowed={allowedRoles} deny={<EditButton disabled />}>
                    <EditButton />
                </CheckRole>
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
