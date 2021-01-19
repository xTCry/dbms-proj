import { MakerList } from './MakerList';
import { MakerCreate } from './MakerCreate';
import { MakerEdit } from './MakerEdit';

import icon from '@material-ui/icons/WorkOutline';
import { UserRole } from '../../types';
export const MakerIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    fields: [UserRole.ADMIN],
};

export const makerResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? MakerList : null,
    create: [...allowedRoles.create].includes(permissions) ? MakerCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? MakerEdit : null,

    icon,
    name: 'maker',
});
