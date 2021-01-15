import React, { memo, ReactElement } from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';
import { UserRole } from '../types';

interface Props extends FieldProps<any> {
    allowed: UserRole[];
    permissions: UserRole;
    children: ReactElement;
    deny?: ReactElement;
}

const CheckRole: FC<Props> = (props) => {
    const { allowed, permissions } = props;
    return allowed.includes(permissions)
        ? React.cloneElement(props.children, { ...props })
        : props.deny
        ? React.cloneElement(props.deny, { ...props })
        : null;
};

CheckRole.defaultProps = {
    allowed: [],
};
export default memo<Props>(CheckRole);
