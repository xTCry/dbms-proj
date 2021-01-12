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
export enum EOrderStatus {
    None = 0,
    Wait,
    Done,
    Broke,
}

/* Records */

export interface roleAttributes extends Record {
    name: string;
    role: number;
}

export interface userAttributes extends Record {
    id: number;
    login: string;
    // password?: string;
    photo_path?: string;
    last_name: string;
    second_name?: string;
    personal_address: string;
    personal_telephone: string;
    personal_birthday: string;
    registeration_date: string;
    role_id: number;

    role?: roleAttributes;
}

export interface studentAttributes extends Record {
    user_id: number;
    group_id: number;
    student_id: string;

    user?: userAttributes;
    group?: groupAttributes;
}

export interface groupAttributes extends Record {
    name: string;
    date_formation: string;
    specialty_id: number;
    
    specialty?: any;
}

export interface markAttributes extends Record {
    date: Date;
    value: string;
    student_id: number;
    schedule_id: number;

    student?: studentAttributes;
    schedule?: any;
}

export interface IOrder extends Record {
    id: string;
    title: string;
    description: string;
    created_at: Date;
    images: Array<IImages>;
    status: EOrderStatus;
    executor: string;
}

export interface IImages {
    name: string;
    url: string;
    cerated_at: Date;
}

/**
 * Types to eventually add in react-admin
 */
export interface IFieldProps<T extends Record = Record> {
    sortable?: boolean;
    addLabel?: boolean;
    label?: string;
    record?: T;
    source?: string;
}
