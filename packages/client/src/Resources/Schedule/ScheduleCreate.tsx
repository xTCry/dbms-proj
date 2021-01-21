import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    required,
    DateInput,
    NumberInput,
} from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import { scheduleType } from '.';
import { FullName } from '../User/FullNameField';
import MyDurationInput from '../../components/MyDurationInput';
import MyTimeInput from '../../components/MyTimeInput';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const ScheduleCreate = (props) => {
    return (
        <Create title="Добавить расписание" {...props}>
            <SimpleForm>
                <DateInput source="date" />
                <MyTimeInput source="time_start" defaultValue="8:30" options={{ format: 'HH:mm' }} minutesStep={5} />
                <MyDurationInput source="duration" defaultValue="1:30" options={{ format: 'HH:mm' }} minutesStep={5} />

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
        </Create>
    );
};
