import { MarklogList } from './MarklogList';

import Icon from '@material-ui/icons/LocalParking';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles } from '../../types';

export const MarklogIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const marklogResource = {
    loadRoles: async () => Backend.getCRUDRoles('mark_log', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? MarklogList : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: MarklogIcon,
        name: 'mark_log',
    }),
};
