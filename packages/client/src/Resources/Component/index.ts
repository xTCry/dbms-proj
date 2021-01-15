import { ComponentList } from './ComponentList';
import { ComponentCreate } from './ComponentCreate';
import { ComponentEdit } from './ComponentEdit';

import icon from '@material-ui/icons/VerifiedUser';
import { UserRole } from '../../types';
export const ComponentIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    fields: [UserRole.ADMIN],
};

export const componentResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? ComponentList : null,
    create: [...allowedRoles.create].includes(permissions) ? ComponentCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? ComponentEdit : null,

    icon,
    name: 'component',
});
