import { SpecialtyList } from './SpecialtyList';
import { SpecialtyCreate } from './SpecialtyCreate';
import { SpecialtyEdit } from './SpecialtyEdit';

import Icon from '@material-ui/icons/FolderSpecialRounded';
import { UserRole } from '../../types';
export const SpecialtyIcon = Icon;

export const specialtyResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? SpecialtyList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? SpecialtyEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? SpecialtyCreate : null,

    icon: SpecialtyIcon,
    name: 'specialty',
});
