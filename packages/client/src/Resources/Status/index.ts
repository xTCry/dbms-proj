import { StatusList } from './StatusList';
import { StatusCreate } from './StatusCreate';
import { StatusEdit } from './StatusEdit';

import icon from '@material-ui/icons/StarRateRounded';
import { UserRole } from '../../types';
export const StatusIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    // fields: [UserRole.ADMIN],
};

export const statusResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? StatusList : null,
    create: [...allowedRoles.create].includes(permissions) ? StatusCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? StatusEdit : null,

    icon,
    name: 'status',
});
