import React from 'react';
import { Create, SimpleForm, ReferenceInput, SelectInput, required } from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';
import { MarkTypeList } from '.';
import { ScheduleTitle } from '../Schedule/ScheduleField';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const MarkCreate = (props) => {
    return (
        <Create title="Добавить отметку" {...props}>
            <SimpleForm>
                <SelectInput source="value" validate={required()} choices={MarkTypeList} />

                <ReferenceInput source="student_id" reference="student">
                    <SelectInput optionText="student_id" />
                </ReferenceInput>

                <ReferenceInput source="schedule_id" reference="schedule">
                    <SelectInput optionText={ScheduleTitle} />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
