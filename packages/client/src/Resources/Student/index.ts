import { StudentList } from './StudentList';
import { StudentCreate } from './StudentCreate';
import { StudentEdit } from './StudentEdit';

import Icon from '@material-ui/icons/PeopleTwoTone';
import { UserRole } from '../../types';
export const SudentIcon = Icon;

export const studentResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? StudentList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? StudentEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? StudentCreate : null,

    icon: SudentIcon,
    name: 'student',
});
