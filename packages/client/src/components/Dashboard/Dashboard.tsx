import React, { useState, useEffect, useCallback, FC } from 'react';

import { useVersion, useDataProvider } from 'react-admin';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NewOrders from './NewOrders';
import PendingOrders from './PendingOrders';
import { EOrderStatus, IOrder, usersAttributes } from '../../types';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

interface UserData {
    [key: string]: usersAttributes;
}

interface State {
    revenue?: number | string;
    nbNewOrders?: number;
    pendingOrders?: IOrder[];
    pendingOrdersUsers?: UserData;
    // nbPendingReviews?: number;
    // pendingReviews?: Review[];
    // pendingReviewsCustomers?: CustomerData;
}

const Dashboard: FC = () => {
    /* const [state, setState] = useState<State>({});
    const version = useVersion();
    const dataProvider = useDataProvider();

    const fetchOrders = useCallback(async () => {
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: recentOrders } = await dataProvider.getList('orders', {
            filter: { created_at: { $gte: aMonthAgo } },
            sort: { field: 'date', order: 'DESC' },
            pagination: { page: 1, perPage: 50 },
        });

        const aggregations = recentOrders
            .filter((order: IOrder) => order.status !== EOrderStatus.None)
            .reduce(
                (stats, order: IOrder) => {
                    if (order.status !== EOrderStatus.None) {
                        stats.revenue += order.cost;
                        stats.nbNewOrders++;
                    }
                    if (order.status === EOrderStatus.Wait) {
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    nbNewOrders: 0,
                    pendingOrders: [],
                }
            );
        setState(state => ({
            ...state,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders,
        }));

        const { data: users } = await dataProvider.getMany('users', {
            ids: aggregations.pendingOrders.map(
                (order: IOrder) => order.executor
            ),
        });
        setState(state => ({
            ...state,
            pendingOrdersUsers: users.reduce(
                (prev: UserData, user: userAttributes) => {
                    prev[user.id] = user;
                    return prev;
                },
                {}
            ),
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchOrders();
    }, [version]); 

    const {
        revenue,
        nbNewOrders,
        pendingOrders,
        pendingOrdersUsers,
    } = state; */

    return (
        <div>
            <Card>
                <CardHeader title="HelloW!" />
                <CardContent>Welcome to this mega supre panel.</CardContent>
            </Card>
            <div style={styles.flex}>
                {/* 
                    <div style={styles.leftCol}>
                        <div style={styles.flex}>
                            <MonthlyRevenue value={revenue} />
                            <NewOrders value={nbNewOrders} />
                        </div>
                        <div style={styles.singleCol}>
                            <Welcome />
                        </div>
                        <div style={styles.singleCol}>
                            <PendingOrders orders={pendingOrders} users={pendingOrdersUsers} />
                        </div>
                    </div>
                */}
            </div>
        </div>
    );
};

export default Dashboard;
