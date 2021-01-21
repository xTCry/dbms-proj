import { SpecialtyList } from './SpecialtyList';
import { SpecialtyCreate } from './SpecialtyCreate';
import { SpecialtyEdit } from './SpecialtyEdit';

import Icon from '@material-ui/icons/FolderSpecialRounded';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';
export const SpecialtyIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const specialtyResource = {
    loadRoles: async () => Backend.getCRUDRoles('specialty', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? SpecialtyList : null,
        create: allowedRoles.create.includes(permissions) ? SpecialtyCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? SpecialtyEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: SpecialtyIcon,
        name: 'specialty',
    }),
};
