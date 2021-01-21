import { getUserRole } from '../modules/UserModule';
import Backend from '../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../types';

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const roleResource = {
    loadRoles: async () => Backend.getCRUDRoles('role', allowedRoles),
    format: (permissions = getUserRole()) => ({
        // list: allowedRoles.list.includes(permissions) ? AuditoryList : null,
        // create: allowedRoles.create.includes(permissions) ? AuditoryCreate : null,
        // edit: allowedRoles.edit.includes(permissions) ? AuditoryEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        // icon: AuditoryIcon,
        name: 'role',
    }),
};
