import { UserList } from './UserList';
import { UserCreate } from './UserCreate';
import { UserEdit } from './UserEdit';

import Icon from '@material-ui/icons/PeopleAltTwoTone';
import { UserRole } from '../../types';
export const OrderIcon = Icon;

export const allowedRoles = {
    list: [UserRole.ADMIN],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    fields: [UserRole.ADMIN],
};

export const userResource = (permissions) => ({
    list: [allowedRoles.list].includes(permissions) ? UserList : null,
    create: [allowedRoles.create].includes(permissions) ? UserCreate : null,
    edit: [allowedRoles.edit].includes(permissions) ? UserEdit : null,

    icon: OrderIcon,
    name: 'users',
    // options: { label: 'Юзеры' },
});
