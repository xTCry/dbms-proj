import React from 'react';
import {
    EditButton,
    Show,
    TextField,
    DateField,
    ReferenceField,
    TabbedShowLayout,
    Tab,
    ReferenceManyField,
    Datagrid,
} from 'react-admin';
import CheckRole from '../../components/CheckRole';
import { allowedRoles as allowedRolesMark } from '../Mark';
import ScheduleField from './ScheduleField';
import FullNameField from '../User/FullNameField';

/* const Aside = ({ record }: any) => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="h6">Stud info</Typography>
        {record && <Typography variant="body2">{<FullNameField record={record} />}</Typography>}
    </div>
); */
export const ScheduleShow = (props) => (
    <Show {...props} /*  aside={<Aside />} */>
        <TabbedShowLayout>
            <Tab label="Отметки">
                <ReferenceManyField reference="mark" target="schedule_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="value" />
                        <DateField source="date" />

                        <ReferenceField source="student_id" reference="student">
                            <FullNameField />
                        </ReferenceField>

                        {/* <ReferenceField
                            source="schedule_id"
                            reference="schedule"
                            link={(record, reference) => `/${reference}/${record.id}/show`}
                        >
                            <ScheduleField />
                        </ReferenceField> */}

                        <CheckRole permissions={props.permissions} allowed={allowedRolesMark.edit}>
                            <EditButton />
                        </CheckRole>
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            {/* <Tab label="summary" path="summary">
                <RichTextField source="student_id" addLabel={false} />

                <ReferenceField source="user_id" reference="user">
                    <FullNameField />
                </ReferenceField>
            </Tab> */}
        </TabbedShowLayout>
    </Show>
);
