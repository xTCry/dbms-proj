import { AuditoryList } from './AuditoryList';
import { AuditoryCreate } from './AuditoryCreate';
import { AuditoryEdit } from './AuditoryEdit';

import Icon from '@material-ui/icons/PlaceRounded';
import { UserRole } from '../../types';
export const AuditoryIcon = Icon;

export const auditoryResource = (permissions) => ({
    list: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER].includes(permissions) ? AuditoryList : null,
    edit: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? AuditoryEdit : null,
    create: [UserRole.ADMIN, UserRole.DEKAN].includes(permissions) ? AuditoryCreate : null,

    icon: AuditoryIcon,
    name: 'auditory',
});
