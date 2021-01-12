import { UserList } from './UserList';
import { UserCreate } from './UserCreate';
import { UserEdit } from './UserEdit';

import Icon from '@material-ui/icons/PeopleAltTwoTone';
import { UserRole } from '../../types';
export const OrderIcon = Icon;

export const userResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? UserList : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? UserCreate : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? UserEdit : null,

    icon: OrderIcon,
    name: 'user',
    // options: { label: 'Юзеры' },
});
