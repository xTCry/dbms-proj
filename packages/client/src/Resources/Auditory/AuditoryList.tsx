import React from 'react';
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
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';

import AuditoryFilter from './AuditoryFilter';
import { UserRole } from '../../types';

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
    return (
        [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) && (
            <Edit {...props} title=" ">
                <SimpleForm undoable={false}>
                    <TextInput source="name" validate={required()} />
                    <TextInput source="corpus" validate={required()} />
                </SimpleForm>
            </Edit>
        )
    );
};

export const AuditoryList = ({ permissions, ...props }) => {
    return (
        <List
            empty={<Empty />}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            filters={<AuditoryFilter />}
            bulkActionButtons={false}
        >
            <Datagrid  expand={<ExpandEdit />}>
                <TextField source="name" />
                <TextField source="corpus" />

                {[UserRole.ADMIN, UserRole.DEKAN].includes(permissions) && <EditButton />}
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};
