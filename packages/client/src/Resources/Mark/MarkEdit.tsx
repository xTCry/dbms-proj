import React from 'react';
import { Edit, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { ScheduleTitle } from '../Schedule/ScheduleField';

const Title = ({ record = { title: 'None' } } = {}) => {
    return <span>Студент {record ? `"${record.title}"` : ''}</span>;
};

export const MarkEdit = ({ permissions, ...props }) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <SelectInput
                source="value"
                validate={required()}
                choices={[
                    { id: 'X', name: 'Неявка' },
                    { id: '1', name: '1' },
                    { id: '2', name: '2' },
                    { id: '3', name: '3' },
                    { id: '4', name: '4' },
                    { id: '5', name: '5' },
                ]}
            />

            <ReferenceInput source="student_id" reference="student">
                <SelectInput optionText="student_id" />
            </ReferenceInput>

            <ReferenceInput source="schedule_id" reference="schedule">
                <SelectInput optionText={ScheduleTitle} />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
