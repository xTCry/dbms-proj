import React from 'react';
import { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FieldProps } from 'react-admin';
// import get from 'lodash/get';
import AvatarField from './AvatarField';
import { IUserModel } from '../../types';

export const FullName = (record) => {
    let temp = record.student_id ? ` (${record.student_id})` : '';
    record = record.user ?? record;
    return ['last_name', 'name', 'second_name'].map((e) => record[e]).join(' ') + temp;
};

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

interface Props extends FieldProps<IUserModel> {
    size?: string;
}

const FullNameField: FC<Props> = ({ record, size, source }) => {
    const classes = useStyles();
    // const value = get(record, source);

    // @ts-ignore
    record = record.user ?? record;
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
