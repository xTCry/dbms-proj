import React, { FC, memo, ReactElement } from 'react';
import { FieldProps } from 'react-admin';

interface Props extends FieldProps {
    children: ReactElement;
    nullable: string | ReactElement;
}

const NullableField: FC<Props> = (props) => {
    return props.record[props.source] ? (
        React.cloneElement(props.children, { ...props })
    ) : typeof props.nullable === 'string' ? (
        <>{props.nullable}</>
    ) : (
        React.cloneElement(props.nullable, { ...props })
    );
};

NullableField.displayName = 'NullableField';
NullableField.defaultProps = {
    // source: 'photo_path',
    // label: 'resources.user.fields.photo_path',
    addLabel: true,
};
export default memo(NullableField);
