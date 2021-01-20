import { BuyList } from './BuyList';
import { BuyCreate } from './BuyCreate';
import { BuyEdit } from './BuyEdit';

import icon from '@material-ui/icons/ShopSharp';
import { UserRole } from '../../types';
export const BuyIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
    edit: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
    // fields: [UserRole.ADMIN],
};

export const buyResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? BuyList : null,
    create: [...allowedRoles.create].includes(permissions) ? BuyCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? BuyEdit : null,

    icon,
    name: 'buy',
});
