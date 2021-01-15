import React from 'react';
import { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FieldProps } from 'react-admin';
import AvatarField from './AvatarField';
import { userAttributes } from '../../types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(0.5),
    },
}));

interface Props extends FieldProps<userAttributes> {
    size?: string;
}

const FullNameField: FC<Props> = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            <AvatarField className={classes.avatar} record={record} size={size} />
            {record.second_name} {record.name} {record.last_name}
        </div>
    ) : null;
};

FullNameField.defaultProps = {
    source: 'name',
    label: 'resources.user.fields.name',
};

export default memo<Props>(FullNameField);
