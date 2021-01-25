import React, { memo, ReactElement } from 'react';
import { FC, Children } from 'react';
import { FieldProps } from 'react-admin';
import { UserRole } from '../types';

interface Props extends FieldProps<any> {
    allowed: UserRole[];
    permissions: UserRole;
    children: ReactElement | ReactElement[];
    deny?: ReactElement;
}
// @ts-ignore
const CheckRole: FC<Props> = (props) => {
    const { allowed, permissions } = props;
    return allowed.includes(permissions)
        ? Array.isArray(props.children)
            ? Children.map(props.children, (child, key) => React.cloneElement(child, { key, ...props }))
            : React.cloneElement(props.children, { ...props })
        : props.deny
        ? React.cloneElement(props.deny, { ...props })
        : null;
};

CheckRole.defaultProps = {
    allowed: [],
};
export default memo<Props>(CheckRole);
