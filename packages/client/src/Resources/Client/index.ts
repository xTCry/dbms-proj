import { ClientList } from './ClientList';
import { ClientCreate } from './ClientCreate';
import { ClientEdit } from './ClientEdit';

import icon from '@material-ui/icons/PeopleOutline';
import { UserRole } from '../../types';
export const ClientIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN, UserRole.OPERATOR],
    edit: [UserRole.ADMIN, UserRole.OPERATOR],
    // fields: [UserRole.ADMIN],
};

export const clientResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? ClientList : null,
    create: [...allowedRoles.create].includes(permissions) ? ClientCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? ClientEdit : null,

    icon,
    name: 'client',
});
