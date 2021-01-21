import { ScheduleList } from './ScheduleList';
import { ScheduleCreate } from './ScheduleCreate';
import { ScheduleEdit } from './ScheduleEdit';

import Icon from '@material-ui/icons/ScheduleRounded';
import { getUserRole } from '../../modules/UserModule';
import Backend from '../../Providers/Backend';
import { defaultRoles, superRoles, UserRole } from '../../types';

export const ScheduleIcon = Icon;

export const scheduleType = [
    { id: 0, name: 'resources.schedule.type.none', color: 'default' },
    { id: 1, name: 'resources.schedule.type.lecture', color: 'yellow' },
    { id: 2, name: 'resources.schedule.type.practice', color: 'green' },
    { id: 3, name: 'resources.schedule.type.lab', color: 'red' },
    { id: 4, name: 'resources.schedule.type.other', color: 'red' },
    { id: 5, name: 'resources.schedule.type.exam', color: 'red' },
];

export let allowedRoles = {
    create: [...superRoles],
    edit: [...superRoles],
    list: [...defaultRoles],
    show: [...defaultRoles],
    delete: [...defaultRoles],
};

export const scheduleResource = {
    loadRoles: async () => Backend.getCRUDRoles('schedule', allowedRoles),
    format: (permissions = getUserRole()) => ({
        list: allowedRoles.list.includes(permissions) ? ScheduleList : null,
        create: allowedRoles.create.includes(permissions) ? ScheduleCreate : null,
        edit: allowedRoles.edit.includes(permissions) ? ScheduleEdit : null,
        // show: allowedRoles.show.includes(permissions) ? StudentShow : null,

        icon: ScheduleIcon,
        name: 'schedule',
    }),
};
