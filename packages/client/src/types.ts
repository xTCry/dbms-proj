import { UserRole } from '@dbms-proj/utils/lib/UserRole';
import { scheduleAttributes, userAttributes } from '@dbms-proj/models';
import { User } from './modules/UserModule';
export { UserRole };

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

