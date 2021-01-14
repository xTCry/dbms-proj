import { ScheduleList } from './ScheduleList';
import { ScheduleCreate } from './ScheduleCreate';
import { ScheduleEdit } from './ScheduleEdit';

import Icon from '@material-ui/icons/ScheduleRounded';
import { UserRole } from '../../types';
export const ScheduleIcon = Icon;

export const scheduleResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? ScheduleList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? ScheduleEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? ScheduleCreate : null,

    icon: ScheduleIcon,
    name: 'schedule',
});
