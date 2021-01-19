import React, { FC } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    EditProps,
    required,
    PasswordInput,
    ImageInput,
    ImageField,
} from 'react-admin';

const Title = (props) => {
    const { record } = props ?? { record: { name: 'None' } };
    return <span>{record ? `"${record.name}"` : ''}</span>;
};

export const UsersEdit: FC<EditProps> = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="login" validate={required()} />

            <TextInput source="surname" validate={required()} />
            <TextInput source="name" validate={required()} />
            <TextInput source="mid_name" validate={required()} />

            <ReferenceInput source="graphic_id" reference="graphic" validate={required()}>
                <SelectInput optionText="graphic_work" />
            </ReferenceInput>

            <ReferenceInput source="position_id" reference="dolzhnost" validate={required()}>
                <SelectInput optionText="position" />
            </ReferenceInput>

            <PasswordInput source="password" />

            <ImageInput source="new_photo" accept="image/*" />
            <ImageField source="photo_employee" />
        </SimpleForm>
    </Edit>
);
