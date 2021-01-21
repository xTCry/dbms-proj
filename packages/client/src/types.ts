import { UserRole } from '@dbms-proj/utils/lib/UserRole';
import { userAttributes } from '@dbms-proj/models';
import { User } from './modules/UserModule';
export { UserRole };


export const superRoles = [UserRole.ADMIN, UserRole.DEKAN];
export const defaultRoles = [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER];
export const defaultRolesWithStudent = [...defaultRoles, UserRole.STUDENT];


export type ThemeName = 'light' | 'dark';

export interface IThemeModule{ theme: ThemeName };

export interface AppState {
    ThemeModule: IThemeModule;
    UserModule: User;
}

/* Records */

export interface IUserModel extends Partial<userAttributes> {
    id: number;

    // role?: roleAttributes;
    token?: string;
    expiresIn?: number;
}

// export type IScheduleModel = Partial<scheduleAttributes> & Required<{ id: number }>;

