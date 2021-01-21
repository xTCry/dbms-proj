import { ScheduleList } from './ScheduleList';
import { ScheduleCreate } from './ScheduleCreate';
import { ScheduleEdit } from './ScheduleEdit';

import Icon from '@material-ui/icons/ScheduleRounded';
import { UserRole } from '../../types';
export const ScheduleIcon = Icon;

export const scheduleType = [
    { id: 0, name: 'resources.schedule.type.none', color: 'default' },
    { id: 1, name: 'resources.schedule.type.lecture', color: 'yellow' },
    { id: 2, name: 'resources.schedule.type.practice', color: 'green' },
    { id: 3, name: 'resources.schedule.type.lab', color: 'red' },
    { id: 4, name: 'resources.schedule.type.other', color: 'red' },
    { id: 5, name: 'resources.schedule.type.exam', color: 'red' },
];

export const scheduleResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? ScheduleList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? ScheduleEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? ScheduleCreate : null,

    icon: ScheduleIcon,
    name: 'schedule',
});
