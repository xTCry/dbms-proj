import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, required, DateInput, NumberInput } from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const ScheduleCreate = (props) => {
    return (
        <Create title="Добавить расписание" {...props}>
            <SimpleForm>
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
        </Create>
    );
};
