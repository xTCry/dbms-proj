import React, { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    CreateButton,
    useTranslate,
    Edit,
    SimpleForm,
    required,
    DateField,
    ReferenceInput,
    SelectInput,
    ReferenceField,
    TopToolbar,
    ExportButton,
    Filter,
    FilterProps,
    TextInput,
} from 'react-admin';
import { makeStyles, Typography, Box } from '@material-ui/core';
import { ImportButton } from 'react-admin-import-csv';
import { styles } from './MarkCreate';
import ScheduleField, { ScheduleTitle } from '../Schedule/ScheduleField';
import { createExporter } from '../../components/ExporterComponent';
import CheckRole from '../../components/CheckRole';
import { allowedRoles } from '.';
import FullNameField, { FullName } from '../User/FullNameField';

const useStyles = makeStyles({
    ...styles,
    image: {
        width: '60px',
        margin: '0.5rem',
        maxHeight: '10rem',
    },
}) as any;

const Empty = ({ basePath = '', resource = {}, permissions }: any) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.mark.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.mark.page.invite')}</Typography>
            {/* <CheckRole permissions={permissions} allowed={allowedRoles.create}> */}
                <CreateButton basePath={basePath} />
            {/* </CheckRole> */}
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

const ExpandEdit = (props) => {
    const classes = useStyles(props);
    return (
        <Edit {...props} title=" ">
            <SimpleForm undoable={false}>
                <SelectInput
                    source="value"
                    validate={required()}
                    choices={[
                        { id: 'X', name: 'Неявка' },
                        { id: '1', name: '1' },
                        { id: '2', name: '2' },
                        { id: '3', name: '3' },
                        { id: '4', name: '4' },
                        { id: '5', name: '5' },
                    ]}
                    formClassName={classes.part_first}
                />

                <ReferenceInput source="student_id" reference="student">
                    <SelectInput optionText="student_id" />
                </ReferenceInput>

                <ReferenceInput source="schedule_id" reference="schedule">
                    <ScheduleField />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

const ListActions = (props) => {
    const { className, basePath, total, resource, currentSort /* , exporter */ } = props;
    return (
        <TopToolbar className={className}>
            <MyFilter context="button" />
            <CreateButton basePath={basePath} />
            <ExportButton disabled={total === 0} resource={resource} sort={currentSort} exporter={exporter} />
            <ImportButton {...props} />
        </TopToolbar>
    );
};

const exporter = createExporter('marks', ['id', 'value', 'student_id', 'schedule_id']);

const Aside = () => {
    // const { data, ids } = useListContext();
    // console.log(data, ids);

    return (
        <div style={{ width: 200, margin: '1em' }}>
            <Typography variant="h6">Статистика отметок</Typography>
            <Typography variant="body2">
                Помещаемость: ...{/* ids.map((id) => data[id]).reduce((sum, post) => sum + post.views, 0) */}
            </Typography>
        </div>
    );
};

const MyFilter: FC<Omit<FilterProps, 'children'>> = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />

        <ReferenceInput source="student_id" reference="student" sort={{ field: 'id', order: 'ASC' }}>
            <SelectInput optionText={FullName} />
        </ReferenceInput>

        <ReferenceInput source="schedule_id" reference="schedule" sort={{ field: 'id', order: 'ASC' }}>
            <SelectInput optionText={ScheduleTitle} />
        </ReferenceInput>
    </Filter>
);
const postRowStyle = (record, index) => ({
    backgroundColor: record.value == 'X' ? '#795f00' : undefined,
});

export const MarkList = (props) => {
    return (
        <List
            aside={<Aside />}
            empty={<Empty />}
            sort={{ field: 'id', order: 'DESC' }}
            bulkActionButtons={false}
            exporter={exporter}
            actions={<ListActions />}
            filters={<MyFilter context="button" />}
            {...props}
        >
            <Datagrid rowStyle={postRowStyle} expand={<ExpandEdit />}>
                <TextField source="id" />
                <TextField source="value" />
                <DateField source="date" />

                <ReferenceField source="student_id" reference="student">
                    <FullNameField />
                </ReferenceField>

                <ReferenceField source="schedule_id" reference="schedule">
                    <ScheduleField />
                </ReferenceField>

                <CheckRole permissions={props.permissions} allowed={allowedRoles.edit}>
                    <EditButton />
                </CheckRole>
            </Datagrid>
        </List>
    );
};
