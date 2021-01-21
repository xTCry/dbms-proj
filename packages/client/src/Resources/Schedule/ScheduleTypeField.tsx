import React, { FC, memo } from 'react';
import { FieldProps, useTranslate } from 'react-admin';
import { Typography } from '@material-ui/core';
import { scheduleType } from '.';

interface Props extends FieldProps<any> {
    size?: string;
}

const ScheduleTypeField: FC<Props> = ({ record, source }) => {
    const translate = useTranslate();
    const { color, name } = ((e) => Object.values(scheduleType).find((t) => t.id === e))(record[source]);
    return <Typography style={{ color }}>{translate(name)}</Typography>;
};

ScheduleTypeField.defaultProps = {
    source: 'lesson_type',
    label: 'resources.schedule.fields.lesson_type',
};

export default memo<Props>(ScheduleTypeField);
