import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { MarkTypeList } from '.';
import { ScheduleTitle } from '../Schedule/ScheduleField';

const Title = ({ record = { title: 'None' } } = {}) => {
    return <span>Изменение отметки {record ? `"${record.title}"` : ''}</span>;
};

export const MarkEdit = ({ permissions, ...props }) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <SelectInput source="value" validate={required()} choices={MarkTypeList} />

            <ReferenceInput source="student_id" reference="student">
                <SelectInput optionText="student_id" />
            </ReferenceInput>

            <ReferenceInput source="schedule_id" reference="schedule">
                <SelectInput optionText={ScheduleTitle} />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
