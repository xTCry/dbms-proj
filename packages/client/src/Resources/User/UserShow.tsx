import { Typography } from '@material-ui/core';
import React from 'react';
import {
    EditButton,
    TopToolbar,
    Show,
    TextField,
    DateField,
    RichTextField,
    ReferenceField,
    TabbedShowLayout,
    Tab,
    ReferenceManyField,
    Datagrid,
    ImageField,
} from 'react-admin';
import FullNameField, { FullName } from './FullNameField';

const PostShowActions = ({ basePath, data, resource }: any) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        {/* <Button color="primary" onClick={customAction}>Custom Action</Button> */}
    </TopToolbar>
);

const Aside = ({ record }: any) => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="h6">User info</Typography>
        {/* <Typography variant="body2">Kekeke</Typography> */}

        {record && <Typography variant="body2">Name: {FullName(record)}</Typography>}
    </div>
);

export const UserShow = (props) => (
    <Show {...props} actions={<PostShowActions />} aside={<Aside />}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField source="login" />
                <TextField source="name" />
                <TextField source="last_name" />
                <TextField source="second_name" />

                <ReferenceField source="role_id" reference="role" link={false}>
                    <TextField source="name" />
                </ReferenceField>

                <ImageField source="photo_path" />
            </Tab>
            <Tab label="body" path="body">
                <RichTextField source="student_id" addLabel={false} />

                <ReferenceField source="user_id" reference="user">
                    <FullNameField />
                </ReferenceField>
            </Tab>
            <Tab label="Marks" path="mark">
                <ReferenceManyField reference="mark" target="student_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="value" />
                        <DateField source="date" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            {/* <SimpleShowLayout>
                <RichTextField source="student_id" />

                <ReferenceField source="user_id" reference="user">
                    <FullNameField />
                </ReferenceField>
            </SimpleShowLayout> */}
        </TabbedShowLayout>
    </Show>
);
