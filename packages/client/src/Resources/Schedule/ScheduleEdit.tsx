import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput, DateInput, NumberInput } from 'react-admin';

const Title = ({ record = { title: 'None' } } = {}) => {
    return <span>Студент {record ? `"${record.title}"` : ''}</span>;
};

export const ScheduleEdit = ({ permissions, ...props }) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <DateInput source="date" />
            <TextInput
                type="time"
                defaultValue="8:30"
                inputProps={{ step: 300 }}
                InputLabelProps={{ shrink: true }}
                source="time_start"
            />
            <NumberInput source="duration" step={300} />
            <TextInput source="lesson_type" />

            <ReferenceInput source="teacher_id" reference="teacher">
                <SelectInput optionText="name" />
            </ReferenceInput>

            <ReferenceInput source="group_id" reference="group">
                <SelectInput optionText="name" />
            </ReferenceInput>

            <ReferenceInput source="lesson_id" reference="lesson">
                <SelectInput optionText="name" />
            </ReferenceInput>

            <ReferenceInput source="auditory_id" reference="auditory">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
