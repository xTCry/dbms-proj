import { TelefoneList } from './TelefoneList';
import { TelefoneCreate } from './TelefoneCreate';
import { TelefoneEdit } from './TelefoneEdit';

import icon from '@material-ui/icons/PhoneIphone';
import { UserRole } from '../../types';
export const TelefoneIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    // fields: [UserRole.ADMIN],
};

export const telefoneResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? TelefoneList : null,
    create: [...allowedRoles.create].includes(permissions) ? TelefoneCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? TelefoneEdit : null,

    icon,
    name: 'telefone',
});
