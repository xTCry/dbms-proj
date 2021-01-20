import { Second_inspectList } from './Second_inspectList';
import { Second_inspectCreate } from './Second_inspectCreate';
import { Second_inspectEdit } from './Second_inspectEdit';

import icon from '@material-ui/icons/ArrowRightSharp';
import { UserRole } from '../../types';
export const Second_inspectIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN, UserRole.ENGEENER_LEAD, UserRole.ENGEENER],
    edit: [UserRole.ADMIN, UserRole.ENGEENER_LEAD, UserRole.ENGEENER],
    // fields: [UserRole.ADMIN],
};

export const second_inspectResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? Second_inspectList : null,
    create: [...allowedRoles.create].includes(permissions) ? Second_inspectCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? Second_inspectEdit : null,

    icon,
    name: 'second_inspect',
});
