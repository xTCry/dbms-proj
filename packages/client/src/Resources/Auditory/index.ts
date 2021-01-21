import { AuditoryList } from './AuditoryList';
import { AuditoryCreate } from './AuditoryCreate';
import { AuditoryEdit } from './AuditoryEdit';

import Icon from '@material-ui/icons/PlaceRounded';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';
export const AuditoryIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const auditoryResource = {
    loadRoles: async () => Backend.getCRUDRoles('auditory', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? AuditoryList : null,
        create: allowedRoles.create.includes(permissions) ? AuditoryCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? AuditoryEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: AuditoryIcon,
        name: 'auditory',
    }),
};
