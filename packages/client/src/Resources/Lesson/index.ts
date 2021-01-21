import { LessonList } from './LessonList';
import { LessonCreate } from './LessonCreate';
import { LessonEdit } from './LessonEdit';

import Icon from '@material-ui/icons/BookTwoTone';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';
export const LessonIcon = Icon;

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const lessonResource = {
    loadRoles: async () => Backend.getCRUDRoles('lesson', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? LessonList : null,
        create: allowedRoles.create.includes(permissions) ? LessonCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? LessonEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: LessonIcon,
        name: 'lesson',
    }),
};
