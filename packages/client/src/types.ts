import { Record } from 'ra-core';
import { UserRole } from '@dbms-proj/utils';
import { User } from './modules/UserModule';
export { UserRole };

export type ThemeName = 'light' | 'dark';

export interface IThemeModule{ theme: ThemeName };

export interface AppState {
    ThemeModule: IThemeModule;
    UserModule: User;
}

// Ordres
/* export enum EOrderStatus {
    None = 0,
    Wait,
    Done,
    Broke,
} */

/* Records */
export interface usersAttributes extends Record {
    id: number;
    surname: string;
    name: string;
    mid_name?: string;
    photo_employee: string;
    graphic_id: number;
    position_id: number;
    login?: string;

    graphic?: graphicAttributes;
    dolzhnost?: dolzhnostAttributes;
}

export interface graphicAttributes {
    id: number;
    graphic_work: string;
    graphic_hours: number;
}

export interface dolzhnostAttributes extends Record {
    position: string;
}
