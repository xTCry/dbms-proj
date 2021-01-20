import { OrderList } from './OrderList';
import { OrderCreate } from './OrderCreate';
import { OrderEdit } from './OrderEdit';

import icon from '@material-ui/icons/ShoppingBasket';
import { UserRole } from '../../types';
export const OrderIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    edit: [UserRole.ADMIN, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    // fields: [UserRole.ADMIN],
};

export const orderResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? OrderList : null,
    create: [...allowedRoles.create].includes(permissions) ? OrderCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? OrderEdit : null,

    icon,
    name: 'order',
});
