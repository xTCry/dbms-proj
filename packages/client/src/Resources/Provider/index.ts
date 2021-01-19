import { ProviderList } from './ProviderList';
import { ProviderCreate } from './ProviderCreate';
import { ProviderEdit } from './ProviderEdit';

import icon from '@material-ui/icons/PeopleOutlined';
import { UserRole } from '../../types';
export const ProviderIcon = icon;

export const allowedRoles = {
    list: [UserRole.ADMIN],
    create: [UserRole.ADMIN],
    edit: [UserRole.ADMIN],
    fields: [UserRole.ADMIN],
};

export const providerResource = (permissions) => ({
    list: [...allowedRoles.list].includes(permissions) ? ProviderList : null,
    create: [...allowedRoles.create].includes(permissions) ? ProviderCreate : null,
    edit: [...allowedRoles.edit].includes(permissions) ? ProviderEdit : null,

    icon,
    name: 'provider',
});
