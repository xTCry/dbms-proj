import { BrandList } from './BrandList';
import { BrandCreate } from './BrandCreate';
import { BrandEdit } from './BrandEdit';

import icon from '@material-ui/icons/BrandingWatermarkSharp';
import { UserRole } from '../../types';
export const BrandIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    fields: [UserRole.ADMIN],
};

export const brandResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? BrandList : null,
    create: [...allowedRoles.create].includes(permissions) ? BrandCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? BrandEdit : null,

    icon,
    name: 'brand',
});
