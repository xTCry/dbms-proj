import React from 'react';
import {
    List,
    Datagrid,
    DateField,
    TextField,
    EditButton,
    // ShowButton,
    // SelectField,
    // ImageField,
    ReferenceField,
    BulkDeleteButton,
    CreateButton,
    useTranslate,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    NumberField,
    required,
} from 'react-admin';
import {
    makeStyles,
    Typography,
    Box,
    // Badge,
    // Button,
    // Chip,
    // Table,
    // TableBody,
    // TableCell,
    // TableHead,
    // TableRow,
    // Dialog,
    // DialogTitle,
    // DialogContent,
    // DialogContentText,
    // DialogActions,
} from '@material-ui/core';

import { styles } from './StudentCreate';
import StudentFilter from './StudentFilter';
import { FullName } from '../User/UserEdit';
import { UserRole } from '../../types';

const dataRowClick = (id, basePath, record) => 'edit'; // record.editable ? 'edit' : 'show';

const useStyles = makeStyles({
    ...styles,
    image: {
        width: '60px',
        margin: '0.5rem',
        maxHeight: '10rem',
    },
}) as any;

const BulkActionButtons = (props) => (
    <>
        <BulkDeleteButton {...props} />
    </>
);

const Empty = ({ basePath = '', resource = {} }) => {
    const translate = useTranslate();

    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.orders.page.empty')}
            </Typography>
            <Typography variant="body1">{translate('resources.orders.page.invite')}</Typography>
            <CreateButton basePath={basePath} />
            {/* <Button onClick={...}>Import</Button> */}
        </Box>
    );
};

const ExpandEdit = ({ permissions, ...props }: any) => {
    const classes = useStyles();
    return (
        [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) && (
            <Edit {...props} title=" ">
                <SimpleForm
                    // form={`order_edit_${props.id}`}
                    undoable={false}
                >
                    <TextInput source="student_id" formClassName={classes.part_first} validate={required()} />
                    <ReferenceInput
                        source="user_id"
                        filter={{ role_id: UserRole.STUDENT }}
                        reference="user"
                        formClassName={classes.part_secont}
                    >
                        <SelectInput optionText={FullName} />
                    </ReferenceInput>
                    <ReferenceInput source="group_id" reference="group">
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                </SimpleForm>
            </Edit>
        )
    );
};

const StatusField = (props) => {
    const { record, source } = props;
    const translate = useTranslate();
    const { color, name } = { color: 'yellow', name: 'none' }; //((status) => Object.values(orderStatus).find((e) => e.id === status))(record[source]);
    return <Typography style={{ color }}>{translate(name)}</Typography>;
};
const PostImagesField = (props) => {
    const { record, source } = props;
    const size = 100;
    return record[source]
        ? record[source].map(({ url, name }, id) => (
              <img
                  key={id}
                  alt={name}
                  src={url}
                  style={{ maxHeight: size, maxWidth: size, marginRight: 8, display: 'block' }}
              />
          ))
        : null;
};

/* 
const initDialog = {
    open: false,
    title: '',
    text: '',
    callback: () => {},
    params: [],
}; */

const ColoredNumberField = (props) =>
    props.record && props.source ? (
        props.record[props.source] > 500 ? (
            <span style={{ color: 'red' }}>
                <NumberField {...props} />
            </span>
        ) : (
            <NumberField {...props} />
        )
    ) : null;

export const StudentList = ({ permissions, ...props }) => {
    // const [dialogData, setDialogData] = React.useState(initDialog);
    // const classes = useStyles();

    return (
        <List
            exporter={false}
            // aside={<Aside />}
            empty={<Empty />}
            {...props}
            sort={{ field: 'id', order: 'DESC' }}
            filters={<StudentFilter />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid rowClick={dataRowClick} expand={<ExpandEdit />}>
                <TextField source="student_id" />

                <ReferenceField source="user_id" reference="user">
                    <TextField source="last_name" />
                </ReferenceField>

                <ReferenceField source="group_id" reference="group">
                    <TextField source="name" />
                </ReferenceField>

                <ReferenceField source="user.role_id" reference="role" link={false}>
                    <TextField source="name" />
                </ReferenceField>

                {/* <TextField source="description" sortable={false} /> */}
                {/* <DateField source="created_at" locales="ru-RU" /> */}

                {/* <StatusField source="status" /> */}

                {/* <PostImagesField source="images" label="Post Images" sortable={false} /> */}
                {/* <ImageField
                    source="images"
                    src="url"
                    title="name"
                    sortable={false}
                    classes={{ image: classes.image }}
                /> */}

                {/* <ColoredNumberField source="cost" options={{ style: 'currency', currency: 'USD' }} /> */}

                {/* <ViolateField source="id" label="Violate" /> */}
                {/* <ActionField source="status" label="Action" dialogData={dialogData} setDialogData={setDialogData} /> */}

                {[UserRole.ADMIN, UserRole.DEKAN].includes(permissions) && <EditButton />}
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};

/* 
const ViolateField = (props) => {
    // const { record } = props;
    // const { reasons } = record;
    const top3 = [
        { key: 1, rate: 1, count: 1 },
        { key: 2, rate: 5, count: 8 },
        { key: 3, rate: 7, count: 13 },
    ]; //reasons.sort((a, b) => b.count - a.count).slice(0, 3);
    return (
        <>
            {top3.map(({ key, rate, count }) => (
                <Badge key={key} badgeContent={count} color="primary">
                    <Chip style={{ margin: '0px 0px 12px 0px' }} label={`${key} ${rate}%`} />
                </Badge>
            ))}
        </>
    );
};

const ActionField = (props) => {
    const { record, source, setDialogData } = props;
    const disabled = record[source] !== 0;
    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 15, backgroundColor: disabled ? 'normal' : 'green' }}
                disabled={disabled}
                onClick={() =>
                    setDialogData({
                        open: true,
                        title: 'Resolve report',
                        text: 'Are you sure to resolve this report?',
                        // callback: handleStatusClick,
                        params: [record.id, 'Resolve'],
                    })
                }
            >
                Resolve
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginRight: 15, backgroundColor: disabled ? 'normal' : 'red' }}
                disabled={disabled}
                onClick={() =>
                    setDialogData({
                        open: true,
                        title: 'Reject report',
                        text: 'Are you sure to reject this report?',
                        // callback: handleStatusClick,
                        params: [record.id, 'Reject'],
                    })
                }
            >
                Reject
            </Button>
        </div>
    );
};

const Reporter = ({ record = { reports: [] } } = {}) => {
    // const { reports } = record;
    const reports = [
        { reportedBy: { username: 'Qq1' }, reason: 'gfd txhgbtr', createdAt: 1919191191 },
        { reportedBy: { username: 'Ge4' }, reason: 'r xg', createdAt: 5665415411 },
        { reportedBy: { username: 'Asd2' }, reason: 'dgjerug', createdAt: 919158151 },
    ];
    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Reporter</TableCell>
                    <TableCell align="left">Reason</TableCell>
                    <TableCell align="left">Created at</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {reports.map(({ reportedBy, reason, createdAt }) => (
                    <TableRow key={createdAt}>
                        <TableCell align="left">{reportedBy.username}</TableCell>
                        <TableCell align="left">{reason}</TableCell>
                        <TableCell align="left">{new Date(createdAt).toLocaleString('vi-VN')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
 */
