import { KafedraList } from './KafedraList';
import { KafedraCreate } from './KafedraCreate';
import { KafedraEdit } from './KafedraEdit';

import Icon from '@material-ui/icons/HomeSharp';
import { UserRole } from '../../types';
export const KafedraIcon = Icon;

export const kafedraResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? KafedraList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? KafedraEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? KafedraCreate : null,

    icon: KafedraIcon,
    name: 'kafedra',
});
