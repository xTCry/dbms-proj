import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const AuditoryCreate = (props) => {
    return (
        <Create title="Добавить аудиторию" {...props}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
                <TextInput source="corpus" validate={required()} />
            </SimpleForm>
        </Create>
    );
};
