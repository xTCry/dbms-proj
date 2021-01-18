import { Record } from 'ra-core';
import { UserRole } from '@dbms-proj/utils/lib/UserRole';
import { roleAttributes, userAttributes } from '@dbms-proj/models';
import { User } from './modules/UserModule';
export { UserRole };

export type ThemeName = 'light' | 'dark';

export interface IThemeModule{ theme: ThemeName };

export interface AppState {
    ThemeModule: IThemeModule;
    UserModule: User;
}

// Ordres
export enum EOrderStatus {
    None = 0,
    Wait,
    Done,
    Broke,
}

/* Records */

export interface IUserModel extends Partial<userAttributes> {
    id: number;

    // role?: roleAttributes;
    token?: string;
    expiresIn?: number;
}

