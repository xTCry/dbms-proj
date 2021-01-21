import React from 'react';
import { Create, SimpleForm, TextInput, required, SelectInput, ReferenceInput } from 'react-admin';
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

export const SpecialtyCreate = (props) => {
    return (
        <Create title="Добавить специальность" {...props}>
            <SimpleForm>
                <TextInput source="name" validate={required()} />
                <ReferenceInput source="kafedra_id" reference="kafedra" validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
