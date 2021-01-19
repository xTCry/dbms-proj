import { Teacher2lessonList } from './Teacher2lessonList';
import { Teacher2lessonCreate } from './Teacher2lessonCreate';
import { Teacher2lessonEdit } from './Teacher2lessonEdit';

import Icon from '@material-ui/icons/Directions';
import { UserRole } from '../../types';
export const Teacher2lessonIcon = Icon;

export const teacher2lessonResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? Teacher2lessonList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? Teacher2lessonEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? Teacher2lessonCreate : null,

    icon: Teacher2lessonIcon,
    name: 'teacher2lesson',
});
