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
    NumberInput,
    NumberField,
    required
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

import { orderStatus } from '.';
import { styles } from './OrderCreate';
import OrderFilter from './OrderFilter';
import OrderSetStatus from './OrderSetStatus';

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
        <OrderSetStatus {...props} />
        <BulkDeleteButton {...props} />
    </>
);

/* const Aside = ({ data = {}, ids = [] }) => {
    let topUser = 'None';
    let stat = {};
    for (const id of ids) {
        const user = data[id].executor;
        const status = data[id].status;
        if (stat[user]) stat[user] = 0;
        if (status !== 0) stat[user]++;
        topUser = user;
    }
    for (const id of Object.keys(stat)) {
        if (stat[id] > stat[topUser]) topUser = id;
    }

    return (
        <div style={{ width: 200, margin: '1em' }}>
            <Typography variant="h6">TOP</Typography>
            <Typography variant="body2">Top executor: {topUser}</Typography>
        </div>
    );
}; */

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

/* const ExpandOrderPanel = (props) => (
    // { id, record, resource }
    <div dangerouslySetInnerHTML={{ __html: props.record.description }} />
); */

const ExpandOrderEdit = (props) => {
    const classes = useStyles();
    return (
        <Edit {...props} title=" ">
            <SimpleForm
                // form={`order_edit_${props.id}`}
                undoable={false}
            >
                <TextInput source="title" formClassName={classes.part_first} />
                <NumberInput source="cost" formClassName={classes.part_secont} validate={required()} />
                <br />
                <SelectInput
                    source="status"
                    formClassName={classes.part_first}
                    choices={orderStatus}
                    defaultValue={0} validate={required()}
                />

                <ReferenceInput source="executor" formClassName={classes.part_secont} reference="users" allowEmpty>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

const StatusField = (props) => {
    const { record, source } = props;
    const translate = useTranslate();
    const { color, name } = ((status) => Object.values(orderStatus).find((e) => e.id === status))(record[source]);
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

export const OrderList = (props) => {
    // const [dialogData, setDialogData] = React.useState(initDialog);
    // const classes = useStyles();

    return (
        <List
            exporter={false}
            // aside={<Aside />}
            empty={<Empty />}
            {...props}
            sort={{ field: 'created_at', order: 'DESC' }}
            filters={<OrderFilter />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid rowClick={dataRowClick} expand={<ExpandOrderEdit />}>
                {/* <TextField source="id" /> */}
                <TextField source="title" />
                {/* <TextField source="description" sortable={false} /> */}
                <DateField source="created_at" locales="ru-RU" />

                {/* <SelectField source="status" choices={orderStatus} /> */}
                <StatusField source="status" />

                <PostImagesField source="images" label="Post Images" sortable={false} />
                {/* <ImageField
                    source="images"
                    src="url"
                    title="name"
                    sortable={false}
                    classes={{ image: classes.image }}
                /> */}

                <ColoredNumberField source="cost" options={{ style: 'currency', currency: 'USD' }} />
                <ReferenceField source="executor" reference="users" link={false}>
                    <TextField source="name" />
                </ReferenceField>

                {/* <ViolateField source="id" label="Violate" /> */}
                {/* <ActionField source="status" label="Action" dialogData={dialogData} setDialogData={setDialogData} /> */}

                <EditButton label="" />
                {/* <ShowButton label="" /> */}
            </Datagrid>
        </List>
    );
};

/* 
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
