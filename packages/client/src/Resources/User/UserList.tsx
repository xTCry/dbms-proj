import React from 'react';
import { List, Datagrid, TextField, ReferenceManyField, SelectField, useTranslate, EditButton, SingleFieldList, ChipField, ReferenceField } from 'react-admin';
// import { orderStatus } from '../Order';

// import MyUrlField from '../../components/MyUrlField';

export const UserList = (props) => {
    // const translate = useTranslate();
    return (
        <List exporter={false} {...props}>
            <Datagrid optimized rowClick="edit">
                <TextField source="id" />
                <TextField source="login" />
                <TextField source="name" />
                <TextField source="last_name" />
                {/* <SingleFieldList>
                    <ChipField source="role.name" />
                </SingleFieldList> */}

                <ReferenceField source="role_id" reference="role" link={false}>
                    <TextField source="name" /> 
                </ReferenceField>

                {/* <MyUrlField source="telegram" /> */}


                {/* <ReferenceManyField
                    label={translate('resources.users.fields.orders')}
                    reference="orders"
                    target="executor"
                    sortable={false}
                >
                    <Datagrid>
                        <TextField source="title" />
                        <SelectField source="status" choices={orderStatus} />
                        <EditButton label="" />
                    </Datagrid>
                </ReferenceManyField> */}
                <EditButton />
            </Datagrid>
        </List>
    );
};
