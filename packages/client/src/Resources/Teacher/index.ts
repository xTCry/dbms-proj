import { TeacherList } from './TeacherList';
import { TeacherCreate } from './TeacherCreate';
import { StudentEdit } from './TeacherEdit';

import Icon from '@material-ui/icons/PeopleTwoTone';
import { UserRole } from '../../types';
export const TeacherIcon = Icon;

export const teacherResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? TeacherList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? StudentEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? TeacherCreate : null,

    icon: TeacherIcon,
    name: 'teacher',
});
