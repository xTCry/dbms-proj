import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    required,
    ImageField,
    ImageInput,
    NumberInput,
} from 'react-admin';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles/withStyles';

import { orderStatus } from '.';

export const styles: Styles<Theme, any> = {
    part_first: { display: 'inline-block' },
    part_secont: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

export const OrderCreate = (props) => {
    const classes = useStyles(props);

    return (
        <Create title="Создать Заказ" {...props}>
            <SimpleForm>
                <TextInput source="title" validate={required()} />
                <TextInput source="description" multiline fullWidth validate={required()} />
                <NumberInput source="cost" validate={required()} />

                <ImageInput source="images" accept="image/*" multiple>
                    <ImageField source="images" />
                </ImageInput>

                <SelectInput
                    source="status"
                    formClassName={classes.part_first}
                    choices={orderStatus}
                    defaultValue={0}
                    validate={required()}
                />

                <ReferenceInput source="executor" formClassName={classes.part_secont} reference="users" allowEmpty>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
