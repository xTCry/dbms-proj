import { OrderList } from './OrderList';
import { OrderCreate } from './OrderCreate';
import { OrderEdit } from './OrderEdit';

import Icon from '@material-ui/icons/Book';
export const OrderIcon = Icon;

export const orderStatus = [
    { id: 0, name: 'resources.orders.status.none', color: 'default' },
    { id: 1, name: 'resources.orders.status.wait', color: 'yellow' },
    { id: 2, name: 'resources.orders.status.done', color: 'green' },
    { id: 3, name: 'resources.orders.status.broke', color: 'red' },
];

export const orderResource = {
    list: OrderList,
    edit: OrderEdit,
    create: OrderCreate,
    icon: OrderIcon,
    name: 'student',
    // options: { label: 'Заказы' },
};
