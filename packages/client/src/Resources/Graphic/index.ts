import { GraphicList } from './GraphicList';
import { GraphicCreate } from './GraphicCreate';
import { GraphicEdit } from './GraphicEdit';

import icon from '@material-ui/icons/CalendarViewDayTwoTone';
import { UserRole } from '../../types';
export const GraphicIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER_LEAD, UserRole.ENGEENER, UserRole.OPERATOR],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    // fields: [UserRole.ADMIN],
};

export const graphicResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? GraphicList : null,
    create: [...allowedRoles.create].includes(permissions) ? GraphicCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? GraphicEdit : null,

    icon,
    name: 'graphic',
});
