import React, { useCallback } from 'react';
import { KeyboardTimePicker } from '@material-ui/pickers';
import { FieldTitle, InputHelperText, useInput } from 'react-admin';
import Icon from '@material-ui/icons/AccessTime'

const MyTimeInput = ({ source, options, label, helperText, margin = 'dense', resource, validate }: any) => {
    const {
        input,
        meta: { touched, error },

        isRequired,
    } = useInput({ resource, validate, source });

    const handleChange = useCallback((value) => {
        Date.parse(value) ? input.onChange(value.toISOString()) : input.onChange(null);
    }, []);

    return (
        <KeyboardTimePicker
            margin={margin}
            ampm={false}
            showTodayButton
            value={input.value ? new Date(input.value) : null}
            onChange={(date) => handleChange(date)}
            // @ts-ignore
            onBlur={() => input.onBlur(input.value ? new Date(input.value).toISOString() : null)}
            helperText={<InputHelperText touched={touched} error={error} helperText={helperText} />}
            label={<FieldTitle label={label} source={source} resource={resource} isRequired={isRequired} />}
            InputLabelProps={{
                shrink: true,
            }}
            keyboardIcon={<Icon />}
            KeyboardButtonProps={{
                'aria-label': 'change time',
            }}
            {...options}
        />
    );
};

export default MyTimeInput;
