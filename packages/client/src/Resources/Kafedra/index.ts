import { KafedraList } from './KafedraList';
import { KafedraCreate } from './KafedraCreate';
import { KafedraEdit } from './KafedraEdit';

import Icon from '@material-ui/icons/HomeSharp';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';
export const KafedraIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const kafedraResource = {
    loadRoles: async () => Backend.getCRUDRoles('kafedra', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? KafedraList : null,
        create: allowedRoles.create.includes(permissions) ? KafedraCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? KafedraEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: KafedraIcon,
        name: 'kafedra',
    }),
};
