import React from 'react';
import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput, required, DateInput } from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const GroupCreate = (props) => {
    return (
        <Create title="Добавление группы" {...props}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
                <DateInput source="date_formation" defaultValue={new Date()} validate={required()} />

                {/* <ReferenceInput source="user_id" reference="user">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}
            </SimpleForm>
        </Create>
    );
};
