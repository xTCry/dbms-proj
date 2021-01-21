import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate, useDataProvider, useVersion } from 'react-admin';
import {
    Avatar,
    CardHeader,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

interface IClientReport {
    id: number;
    price_repair: number;
    mob_telefone: string;
    surname: string;
}

const Profile: FC = (props) => {
    const [state, setState] = useState<{ reports: IClientReport[] }>({ reports: [] });
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const version = useVersion();
    const classes = useStyles();

    let date3m = new Date().setMonth(new Date().getMonth() - 3);

    const [selectedDateFrom, setSelectedDateFrom] = React.useState<Date | null>(new Date(date3m));
    const [selectedDateTo, setSelectedDateTo] = React.useState<Date | null>(new Date());

    const fetchClientReport = useCallback(async () => {
        console.log('date between', selectedDateFrom, selectedDateTo);
        const { data: reports } = await dataProvider.getList<IClientReport>('client/report', {
            filter: { date1: selectedDateFrom, date2: selectedDateTo },
            sort: { field: 'date', order: 'DESC' },
            pagination: { page: 1, perPage: 50 },
        });

        setState((state) => ({
            ...state,
            reports,
        }));
    }, [dataProvider, selectedDateFrom, selectedDateTo]);

    useEffect(() => {
        fetchClientReport();
    }, [version, selectedDateFrom, selectedDateTo]);

    const handleDateFromChange = (date, val) => {
        setSelectedDateFrom(val);
    };
    const handleDateToChange = (date, val) => {
        setSelectedDateTo(val);
    };

    const { reports } = state;

    return (
        <>
            <Card className={classes.root}>
                <CardHeader title={translate('bo.profile.title')} />
                <List dense={true}>
                    {reports.map((record) => (
                        <ListItem key={record.id} button component={Link} to={`/client/${record.id}`}>
                            <ListItemAvatar>
                                <Avatar>{record.id}</Avatar>
                            </ListItemAvatar>

                            <ListItemText primary={record.surname} secondary={record.mob_telefone} />
                            <ListItemSecondaryAction>
                                <span className={classes.cost}>{record.price_repair} ₽</span>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    );
};

export default Profile;
