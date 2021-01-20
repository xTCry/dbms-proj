import { Pruduct_trackList } from './Pruduct_trackList';
import { Pruduct_trackCreate } from './Pruduct_trackCreate';
import { Pruduct_trackEdit } from './Pruduct_trackEdit';

import icon from '@material-ui/icons/TrackChanges';
import { UserRole } from '../../types';
export const Pruduct_trackIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN, UserRole.ENGEENER_LEAD, UserRole.ENGEENER],
    edit: [UserRole.ADMIN, UserRole.ENGEENER_LEAD, UserRole.ENGEENER],
    // fields: [UserRole.ADMIN],
};

export const pruduct_trackResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? Pruduct_trackList : null,
    create: [...allowedRoles.create].includes(permissions) ? Pruduct_trackCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? Pruduct_trackEdit : null,

    icon,
    name: 'pruduct_track',
});
