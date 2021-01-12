import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, required } from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const StudentCreate = (props) => {
    return (
        <Create title="Добавить студента" {...props}>
            <SimpleForm>
                <TextInput source="student_id" validate={required()} />

                <ReferenceInput source="user_id" reference="user">
                    <SelectInput optionText="name" />
                </ReferenceInput>

                <ReferenceInput source="group_id" reference="group">
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
