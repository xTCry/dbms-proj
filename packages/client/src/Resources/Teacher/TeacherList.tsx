import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    ReferenceField,
    CreateButton,
    useTranslate,
    ReferenceManyField,
    ShowButton,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { ImportButton } from 'react-admin-import-csv';

import FullNameField from '../User/FullNameField';
import CheckRole from '../../components/CheckRole';
import TextFieldEmpty from '../../components/TextFieldEmpty';
import { allowedRoles } from '.';
import { getUserRole } from '../../modules/UserModule';

const Empty = (props) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.teacher.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.teacher.page.invite')}</Typography>

            <CheckRole permissions={getUserRole()} allowed={allowedRoles.create}>
                <CreateButton basePath={props.basePath} />
                <ImportButton {...props} />
            </CheckRole>
        </Box>
    );
};

export const TeacherList = (props) => {
    const translate = useTranslate();
    return (
        <List exporter={false} empty={<Empty />} sort={{ field: 'id', order: 'DESC' }} {...props}>
            <Datagrid>
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

                <TextFieldEmpty source="experience" />

                <CheckRole
                    permissions={props.permissions}
                    allowed={allowedRoles.edit}
                    deny={<EditButton label="" disabled />}
                >
                    <EditButton />
                </CheckRole>
                <CheckRole
                    permissions={props.permissions}
                    allowed={allowedRoles.show}
                    deny={<ShowButton label="" disabled />}
                >
                    <ShowButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
