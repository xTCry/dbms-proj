import { MarkList } from './MarkList';
import { MarkCreate } from './MarkCreate';
import { MarkEdit } from './MarkEdit';

import Icon from '@material-ui/icons/ConfirmationNumberRounded';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';

export const MarkIcon = Icon;

export const MarkTypeList = [
    { id: 'X', name: 'Неявка' },
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
];

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const markResource = {
    loadRoles: async () => Backend.getCRUDRoles('mark', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? MarkList : null,
        create: allowedRoles.create.includes(permissions) ? MarkCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? MarkEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: MarkIcon,
        name: 'mark',
    }),
};
