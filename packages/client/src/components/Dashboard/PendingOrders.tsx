import React, { FC } from 'react';
// import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

// import { IUserModel, IOrder } from '../../types';

interface Props {
    [key: string]: any;
    // orders?: IOrder[];
    // users?: { [key: string]: IUserModel };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
}));

const PendingOrders: FC<Props> = (props) => {
    let { orders = [], users = {} } = props;
    const translate = useTranslate();
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader title={translate('bo.dashboard.pending_orders')} />
            {/* <List dense={true}>
                {orders.map((record: IOrder) => (
                    <ListItem key={record.id} button component={Link} to={`/orders/${record.id}`}>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemAvatar>
                            {users[record.executor] ? (
                                <Avatar src={`${users[record.executor].avatar}?size=32x32`} />
                            ) : (
                                <Avatar />
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={new Date(record.created_at).toLocaleString('ru-RU')}
                            secondary={translate('bo.dashboard.order.items', {
                                smart_count: record.images.length,
                                nb_items: record.images.length,
                                user_name: users[record.executor] ? `${users[record.executor].name}` : '',
                            })}
                        />
                        <ListItemSecondaryAction>
                            <span className={classes.cost}>{record.cost}$</span>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List> */}
        </Card>
    );
};

export default PendingOrders;
