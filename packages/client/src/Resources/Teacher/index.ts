import { TeacherList } from './TeacherList';
import { TeacherCreate } from './TeacherCreate';
import { TeacherEdit } from './TeacherEdit';
// import { TeacherShow } from './TeacherShow';

import Icon from '@material-ui/icons/PeopleTwoTone';
import { defaultRoles, superRoles, UserRole } from '../../types';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
export const TeacherIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const teacherResource = {
    loadRoles: async () => Backend.getCRUDRoles('teacher', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? TeacherList : null,
        create: allowedRoles.create.includes(permissions) ? TeacherCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? TeacherEdit : null,
        // show: allowedRoles.show.includes(permissions) ? UserShow : null,

        icon: TeacherIcon,
        name: 'teacher',
    }),
};
