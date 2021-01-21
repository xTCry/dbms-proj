import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, required } from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const TeacherCreate = (props) => {
    return (
        <Create title="Добавить преподавателя" {...props}>
            <SimpleForm>
                <TextInput source="experience" />
                <ReferenceInput source="user_id" reference="user" validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
