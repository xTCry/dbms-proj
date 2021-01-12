import { ThemeName, IThemeModule } from '../types';

const CHANGE_THEME = 'ThemeModule.CHANGE_THEME';

const initialState: IThemeModule = { theme: getTheme() };

//
// TODO: Migrate this module to UserModule
//

const ThemeModule = (state = initialState, action: any): IThemeModule => {
    switch (action.type) {
        case CHANGE_THEME:
            setTheme(action.theme);
            return { ...state, theme: action.theme };
        default:
            return state;
    }
};

export const changeTheme = (theme: ThemeName) => ({
    type: CHANGE_THEME,
    theme,
});

export function setTheme(e: string) {
    localStorage.setItem('theme', e);
}

export function getTheme(): ThemeName {
    return (localStorage.getItem('theme') as ThemeName) || 'dark';
}

export default ThemeModule;
