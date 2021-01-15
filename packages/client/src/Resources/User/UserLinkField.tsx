import React from 'react';
import { FC } from 'react';
import { Link, FieldProps } from 'react-admin';
import { userAttributes } from '../../types';

import FullNameField from './FullNameField';

const UserLinkField: FC<FieldProps<userAttributes>> = (props) =>
    props.record ? (
        // @ts-ignore
        <Link to={`/user/${props.record.id}`}>
            <FullNameField {...props} />
        </Link>
    ) : null;

UserLinkField.defaultProps = {
    source: 'user_id',
    addLabel: true,
};

export default UserLinkField;
