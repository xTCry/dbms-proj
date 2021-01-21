import React, { FC } from 'react';
import { FieldProps /* , DateField, TextField */ } from 'react-admin';
import { scheduleAttributes } from '@dbms-proj/models';
import { getTimeString } from '../../components/TimeField';

export const ScheduleTitle = (record) =>
    `${new Date(record.date).toLocaleDateString()} в ${getTimeString(record.time_start)} (${record.lesson.name})`;

const ScheduleField: FC<FieldProps<scheduleAttributes>> = (props) => {
    return props.record ? <span>{ScheduleTitle(props.record)}</span> : null;
    /* return props.record ? (
        <span>
            <DateField {...props} source="date" />
            <span> в </span>
            <TimeField {...props} source="time_start" /> (<TextField {...props} source="lesson.name" />)
        </span>
    ) : null; */
};

export default ScheduleField;
