import { MarkList } from './MarkList';
import { MarkCreate } from './MarkCreate';
import { MarkEdit } from './MarkEdit';

import Icon from '@material-ui/icons/ConfirmationNumberRounded';
import { UserRole } from '../../types';
export const MarkIcon = Icon;

export const markResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? MarkList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? MarkEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? MarkCreate : null,

    icon: MarkIcon,
    name: 'mark',
});
