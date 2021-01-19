import { Headman2groupList } from './Headman2groupList';
import { Headman2groupCreate } from './Headman2groupCreate';
import { Headman2groupEdit } from './Headman2groupEdit';

import Icon from '@material-ui/icons/PolicyTwoTone';
import { UserRole } from '../../types';
export const Headman2groupIcon = Icon;

export const headman2groupResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? Headman2groupList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? Headman2groupEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? Headman2groupCreate : null,

    icon: Headman2groupIcon,
    name: 'headman2group',
});
