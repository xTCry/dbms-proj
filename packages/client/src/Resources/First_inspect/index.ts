import { First_inspectList } from './First_inspectList';
import { First_inspectCreate } from './First_inspectCreate';
import { First_inspectEdit } from './First_inspectEdit';

import icon from '@material-ui/icons/FirstPageTwoTone';
import { UserRole } from '../../types';
export const First_inspectIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN, UserRole.OPERATOR],
    edit: [UserRole.ADMIN, UserRole.OPERATOR],
    // fields: [UserRole.ADMIN],
};

export const first_inspectResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? First_inspectList : null,
    create: [...allowedRoles.create].includes(permissions) ? First_inspectCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? First_inspectEdit : null,

    icon,
    name: 'first_inspect',
});
