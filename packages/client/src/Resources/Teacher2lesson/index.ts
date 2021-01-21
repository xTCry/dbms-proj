import { Teacher2lessonList } from './Teacher2lessonList';
import { Teacher2lessonCreate } from './Teacher2lessonCreate';
import { Teacher2lessonEdit } from './Teacher2lessonEdit';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';

import Icon from '@material-ui/icons/Directions';
import { defaultRoles, superRoles, UserRole } from '../../types';
export const Teacher2lessonIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const teacher2lessonResource = {
    loadRoles: async () => Backend.getCRUDRoles('teacher2lesson', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? Teacher2lessonList : null,
        create: allowedRoles.create.includes(permissions) ? Teacher2lessonCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? Teacher2lessonEdit : null,
        // show: allowedRoles.show.includes(permissions) ? UserShow : null,

        icon: Teacher2lessonIcon,
        name: 'teacher2lesson',
    }),
};
