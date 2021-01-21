import { GroupList } from './GroupList';
import { GroupCreate } from './GroupCreate';
import { GroupEdit } from './GroupEdit';

import Icon from '@material-ui/icons/GroupWorkTwoTone';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';
export const GroupIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const groupResource = {
    loadRoles: async () => Backend.getCRUDRoles('group', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? GroupList : null,
        create: allowedRoles.create.includes(permissions) ? GroupCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? GroupEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: GroupIcon,
        name: 'group',
    }),
};
