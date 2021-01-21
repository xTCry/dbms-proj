import { StudentList } from './StudentList';
import { StudentCreate } from './StudentCreate';
import { StudentEdit } from './StudentEdit';
import { StudentShow } from './StudentShow';

import Icon from '@material-ui/icons/PeopleTwoTone';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';
export const SudentIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const studentResource = {
    loadRoles: async () => Backend.getCRUDRoles('student', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? StudentList : null,
        create: allowedRoles.create.includes(permissions) ? StudentCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? StudentEdit : null,
        show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: SudentIcon,
        name: 'student',
    }),
};
