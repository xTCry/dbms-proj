import { MakerList } from './MakerList';
import { MakerCreate } from './MakerCreate';
import { MakerEdit } from './MakerEdit';

import icon from '@material-ui/icons/WorkOutline';
import { UserRole } from '../../types';
export const MakerIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
    edit: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
    // fields: [UserRole.ADMIN],
};

export const makerResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? MakerList : null,
    create: [...allowedRoles.create].includes(permissions) ? MakerCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? MakerEdit : null,

    icon,
    name: 'maker',
});
