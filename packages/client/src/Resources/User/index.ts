import { UserList } from './UserList';
import { UserCreate } from './UserCreate';
import { UserEdit } from './UserEdit';
import { UserShow } from './UserShow';

import Icon from '@material-ui/icons/PeopleAltTwoTone';
import { defaultRoles, superRoles } from '../../types';
import Backend from '../../Providers/Backend';
import { getUserRole } from '../../modules/UserModule';
export const UserIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const userResource = {
    loadRoles: async () => Backend.getCRUDRoles('user', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? UserList : null,
        create: allowedRoles.create.includes(permissions) ? UserCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? UserEdit : null,
        show: allowedRoles.show.includes(permissions) ? UserShow : null,

        icon: UserIcon,
        name: 'user',
    }),
};
