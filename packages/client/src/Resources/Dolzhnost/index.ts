import { DolzhnostList } from './DolzhnostList';
import { DolzhnostCreate } from './DolzhnostCreate';
import { DolzhnostEdit } from './DolzhnostEdit';

import icon from '@material-ui/icons/VerifiedUser';
import { UserRole } from '../../types';
export const DolzhnostIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    fields: [UserRole.ADMIN],
};

export const dolzhnostResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? DolzhnostList : null,
    create: [...allowedRoles.create].includes(permissions) ? DolzhnostCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? DolzhnostEdit : null,

    icon,
    name: 'dolzhnost',
});
