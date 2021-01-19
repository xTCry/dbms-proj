import React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';
import { scheduleAttributes } from '@dbms-proj/models';

export const ScheduleTitle = (record) => `${record.date} в ${record.time_start}`;

const ScheduleField: FC<FieldProps<scheduleAttributes>> = (props) => {
    return props.record ? <span>{ScheduleTitle(props.record)}</span> : null;
};
export default ScheduleField;
