import React, { FC } from 'react';
import { TextField, TextFieldProps } from 'react-admin';

const TextFieldEmpty: FC<TextFieldProps> = (props) => <TextField emptyText="Не указано" {...props} />;

export default TextFieldEmpty;
