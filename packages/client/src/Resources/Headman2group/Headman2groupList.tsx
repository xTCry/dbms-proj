import React, { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    ReferenceField,
    CreateButton,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    required,
} from 'react-admin';
import { FilterProps, Filter, TopToolbar, ExportButton } from 'react-admin';
import { ImportButton } from 'react-admin-import-csv';
import { createExporter } from '../../components/ExporterComponent';
import CheckRole from '../../components/CheckRole';

import FullNameField from '../User/FullNameField';
import { allowedRoles } from '.';
import { getUserRole } from '../../modules/UserModule';

const exporter = createExporter('headmab2group', ['id', 'student_id', 'group_id']);

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск" source="q" resettable alwaysOn />

        <ReferenceInput source="group_id" reference="group" sort={{ field: 'id', order: 'ASC' }}>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const ListActions = (props) => {
    const { className, total, resource, currentSort } = props;
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

const ExpandEdit = (props: any) => {
    return (
        <Edit {...props} title=" ">
            <SimpleForm
                // form={`order_edit_${props.id}`}
                undoable={false}
            >
                <ReferenceInput source="student_id" reference="student" validate={required()}>
                    <SelectInput optionText="user.name" />
                </ReferenceInput>

                <ReferenceInput source="group_id" reference="group" validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

export const Headman2groupList = (props) => {
    return (
        <List
            sort={{ field: 'id', order: 'DESC' }}
            exporter={exporter}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
            bulkActionButtons={false}
            {...props}
        >
            <Datagrid
                // rowClick={(id, basePath, record) => (allowedRoles.includes(props.permissions) ? 'edit' : 'show')}
                expand={allowedRoles.edit.includes(props.permissions) ? <ExpandEdit /> : null}
            >
                <ReferenceField source="student_id" reference="student">
                    <FullNameField />
                </ReferenceField>

                <ReferenceField source="group_id" reference="group">
                    <TextField source="name" />
                </ReferenceField>

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
