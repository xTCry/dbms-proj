import React, { Fragment, useState, useCallback } from 'react';
import { useUpdateMany, useRefresh, useNotify, useUnselectAll, SelectInput, useTranslate, Button } from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiButton from '@material-ui/core/Button';
import ConfirmIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Form } from 'react-final-form';

import { orderStatus } from '.';

const useStyles = makeStyles((theme) => ({
    contentText: {
        minWidth: 400,
    },
    confirmPrimary: {
        color: theme.palette.primary.main,
    },
    confirmWarning: {
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
    iconPaddingStyle: {
        paddingRight: '0.5em',
    },
}));

const getStatusName = (status) => Object.values(orderStatus).find((e) => e.id === status).name;
const StatusDialog = (props) => {
    const { isOpen, loading, title, content, onConfirm, onClose, setStatus, status, count } = props;

    const classes = useStyles();
    const translate = useTranslate();
    const handleConfirm = useCallback(
        (e) => {
            e.stopPropagation();
            onConfirm(e);
        },
        [onConfirm]
    );
    const handleClick = useCallback((covid_19) => {
        covid_19.stopPropagation();
    }, []);
    const handleChange = (e) => setStatus(e.target.value);

    return (
        <Dialog keepMounted open={isOpen} onClose={onClose} onClick={handleClick}>
            <DialogTitle>{translate(title, { smart_count: count, name: translate(getStatusName(status)) })}</DialogTitle>
            <DialogContent>
                <DialogContentText>{translate(content, { smart_count: count, name: translate(getStatusName(status)) })}</DialogContentText>
                <Form
                    onSubmit={(e) => e.preventDefault()}
                    render={() => (
                        <SelectInput
                            disabled={loading}
                            label="resources.orders.fields.status"
                            source="status"
                            defaultValue={status}
                            choices={orderStatus}
                            onChange={handleChange}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <MuiButton disabled={loading} onClick={onClose}>
                    <CancelIcon className={classes.iconPaddingStyle} />
                    {translate('ra.action.cancel', { _: 'Cancel' })}
                </MuiButton>
                <MuiButton autoFocus disabled={loading} onClick={handleConfirm} color="primary">
                    <ConfirmIcon className={classes.iconPaddingStyle} />
                    {translate('ra.action.confirm', { _: 'Ok' })}
                </MuiButton>
            </DialogActions>
        </Dialog>
    );
};

const OrderSetStatus = (props) => {
    const { selectedIds } = props;
    const unselectAll = useUnselectAll();
    const translate = useTranslate();
    const refresh = useRefresh();
    const notify = useNotify();

    const [status, setStatus] = useState(0);
    const [open, setOpen] = useState(false);
    const [updateMany, { loading }] = useUpdateMany(
        'orders',
        selectedIds,
        { status },
        {
            onSuccess: () => {
                refresh();
                notify('resources.orders.page.status_updated', 'info', { smart_count: selectedIds.length, messageArgs: { name: translate(getStatusName(status)) } });
                unselectAll('orders');
            },
            onFailure: (error) => notify('Error: orders not updated', 'warning'),
        }
    );

    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);
    const handleConfirm = () => {
        updateMany();
        setOpen(false);
    };

    return (
        <Fragment>
            <Button label="resources.orders.page.status_change" onClick={handleClick} />
            <StatusDialog
                isOpen={open}
                loading={loading}
                title={'resources.orders.page.status_changing'}
                content={'resources.orders.page.status_change_to'}
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
                setStatus={setStatus}
                status={status}
                count={selectedIds.length}
            />
        </Fragment>
    );
};

export default OrderSetStatus;
