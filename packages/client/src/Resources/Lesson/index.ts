import { LessonList } from './LessonList';
import { LessonCreate } from './LessonCreate';
import { LessonEdit } from './LessonEdit';

import Icon from '@material-ui/icons/BookTwoTone';
import { UserRole } from '../../types';
export const LessonIcon = Icon;

export const lessonResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? LessonList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? LessonEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? LessonCreate : null,

    icon: LessonIcon,
    name: 'lesson',
});
