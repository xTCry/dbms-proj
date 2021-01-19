import { Typography } from '@material-ui/core';
import React from 'react';
import {
    EditButton,
    TopToolbar,
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    RichTextField,
    ReferenceField,TabbedShowLayout, Tab, ReferenceManyField, Datagrid
} from 'react-admin';
import FullNameField from '../User/FullNameField';

const PostShowActions = ({ basePath, data, resource }: any) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        {/* <Button color="primary" onClick={customAction}>Custom Action</Button> */}
    </TopToolbar>
);
const Aside = ({ record }: any) => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="h6">Stud info</Typography>
        <Typography variant="body2">Kekeke</Typography>

        {record && <Typography variant="body2">Name: {record.user.name}</Typography>}
    </div>
);
export const StudentShow = (props) => (
    <Show {...props} actions={<PostShowActions />} aside={<Aside />}>
        <TabbedShowLayout>
            <Tab label="summary">
                <RichTextField source="student_id" />
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
