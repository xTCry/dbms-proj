import { GroupList } from './GroupList';
import { GroupCreate } from './GroupCreate';
import { GroupEdit } from './GroupEdit';

import Icon from '@material-ui/icons/GroupWorkTwoTone';
import { UserRole } from '../../types';
export const GroupIcon = Icon;

export const groupResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? GroupList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? GroupEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? GroupCreate : null,

    icon: GroupIcon,
    name: 'group',
});
