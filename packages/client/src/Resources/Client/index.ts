import { ClientList } from './ClientList';
import { ClientCreate } from './ClientCreate';
import { ClientEdit } from './ClientEdit';

import icon from '@material-ui/icons/VerifiedUser';
import { UserRole } from '../../types';
export const ClientIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    fields: [UserRole.ADMIN],
};

export const clientResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? ClientList : null,
    create: [...allowedRoles.create].includes(permissions) ? ClientCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? ClientEdit : null,

    icon,
    name: 'client',
});
