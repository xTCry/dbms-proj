import { Headman2groupList } from './Headman2groupList';
import { Headman2groupCreate } from './Headman2groupCreate';
import { Headman2groupEdit } from './Headman2groupEdit';

import Icon from '@material-ui/icons/PolicyTwoTone';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';
export const Headman2groupIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const headman2groupResource = {
    loadRoles: async () => Backend.getCRUDRoles('headman2group', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? Headman2groupList : null,
        create: allowedRoles.create.includes(permissions) ? Headman2groupCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? Headman2groupEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: Headman2groupIcon,
        name: 'headman2group',
    }),
};
