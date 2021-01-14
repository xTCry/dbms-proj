import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, required } from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const MarkCreate = (props) => {
    return (
        <Create title="Добавить отметку" {...props}>
            <SimpleForm>
                <TextInput source="value" validate={required()} />

                <ReferenceInput source="student_id" reference="student">
                    <SelectInput optionText="student_id" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
