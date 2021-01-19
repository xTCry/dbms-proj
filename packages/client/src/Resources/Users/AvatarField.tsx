import React, { memo } from 'react';
import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { FieldProps } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import { usersAttributes } from '../../types';

interface Props extends FieldProps<usersAttributes> {
    className?: string;
    size?: string;
}

const useStyles = makeStyles((theme) => ({
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(0.5),
    },
}));

const AvatarField: FC<Props> = ({ record, size = '25', className }) => {
    const classes = useStyles();

    return record ? (
        <Avatar
            src={`${record.photo_employee}?size=${size}x${size}`}
            style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
            className={className ?? classes.avatar}
        />
    ) : null;
};

AvatarField.defaultProps = {
    source: 'photo_employee',
    label: 'resources.users.fields.photo_employee',
};
export default memo<Props>(AvatarField);
