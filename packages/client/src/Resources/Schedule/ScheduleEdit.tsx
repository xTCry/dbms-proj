import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput, DateInput, NumberInput } from 'react-admin';
import MyTimeInput from '../../components/MyTimeInput';
import MyDurationInput from '../../components/MyDurationInput';
import { scheduleType } from '.';
import { FullName } from '../User/FullNameField';

const Title = ({ record }: any) => {
    return <span>Расписание {record ? `"${record.date}"` : ''}</span>;
};

export const ScheduleEdit = ({ permissions, ...props }) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />

            <DateInput source="date" />
            <MyTimeInput source="time_start" defaultValue="8:30" options={{ format: 'HH:mm' }} minutesStep={5} />
            <MyDurationInput source="duration" defaultValue="1:30" options={{ format: 'HH:mm' }} minutesStep={5} />

            {/* <NumberInput source="duration" step={300} /> */}

            {/* <TextInput source="lesson_type" /> */}
            <SelectInput source="lesson_type" choices={scheduleType} defaultValue={1} validate={required()} />

            <ReferenceInput source="teacher_id" reference="teacher">
                <SelectInput optionText={FullName} />
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
