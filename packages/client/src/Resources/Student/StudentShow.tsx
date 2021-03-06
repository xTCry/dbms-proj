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
} from 'react-admin';
import CheckRole from '../../components/CheckRole';
import { allowedRoles as allowedRolesMark } from '../Mark';
import ScheduleField from '../Schedule/ScheduleField';
import FullNameField from '../User/FullNameField';
// import { UserQuickPreviewButton } from '../User/UserQuickPreviewButton';

const StudentShowActions = ({ basePath, data, resource }: any) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        {/* <Button color="primary" onClick={customAction}>Custom Action</Button> */}
    </TopToolbar>
);
const Aside = ({ record }: any) => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="h6">Stud info</Typography>
        {record && <Typography variant="body2">{<FullNameField record={record} />}</Typography>}
    </div>
);
export const StudentShow = (props) => (
    <Show {...props} actions={<StudentShowActions />} aside={<Aside />}>
        <TabbedShowLayout>
            <Tab label="Резюме">
                <RichTextField source="student_id" addLabel={false} />

                <ReferenceField source="user_id" reference="user">
                    <FullNameField />
                </ReferenceField>
                {/* <UserQuickPreviewButton /> */}
            </Tab>
            <Tab label="Отметки" path="mark">
                <ReferenceManyField reference="mark" target="student_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="value" />
                        <DateField source="date" />

                        <ReferenceField
                            source="schedule_id"
                            reference="schedule"
                            link={(record, reference) => `/${reference}/${record.id}/show`}
                        >
                            <ScheduleField />
                        </ReferenceField>

                        <CheckRole permissions={props.permissions} allowed={allowedRolesMark.edit}>
                            <EditButton />
                        </CheckRole>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);
