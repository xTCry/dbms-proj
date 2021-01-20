import * as React from 'react';
import { FC, memo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

import { PublicFieldProps, InjectedFieldProps, fieldPropTypes, sanitizeRestProps } from './fieldTypes';

export const getTimeString = (value: any, showSeconds = false) => {
    const date =
        value instanceof Date ? value : typeof value === 'number' ? new Date((value - 180) * 6e4) : new Date(value);
    let timeString = date.toLocaleTimeString();

    if (!showSeconds) {
        timeString = timeString.split(':').slice(0, -1).join(':');
    }
    return timeString;
};

export const TimeField: FC<TimeFieldProps> = memo<TimeFieldProps>(
    ({ className, emptyText, record, source, showSeconds, ...rest }) => {
        if (!record) {
            return null;
        }

        const value = get(record, source);
        if (value == null) {
            return emptyText ? (
                <Typography component="span" variant="body2" className={className} {...sanitizeRestProps(rest)}>
                    {emptyText}
                </Typography>
            ) : null;
        }
        
        const timeString = getTimeString(value, showSeconds);

        return (
            <Typography component="span" variant="body2" className={className} {...sanitizeRestProps(rest)}>
                {timeString}
            </Typography>
        );
    }
);

TimeField.defaultProps = {
    addLabel: true,
    showSeconds: false,
};

TimeField.propTypes = {
    // @ts-ignore
    ...Typography.propTypes,
    ...fieldPropTypes,
    showSeconds: PropTypes.bool,
};

export interface TimeFieldProps extends PublicFieldProps, InjectedFieldProps, TypographyProps {
    showSeconds?: boolean;
}

export default TimeField;
