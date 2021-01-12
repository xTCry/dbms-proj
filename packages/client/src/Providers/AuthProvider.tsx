import store from '../store';
import Backend from './Backend';
import { setToken, removeToken, resetUser, initUser, User, getUser } from '../modules/UserModule';

export const authProvider = {
    login: async ({ username, password }) => {
        try {
            const payload = await Backend.request('auth/login', {
                username,
                password,
            });
            setToken(payload.token);
            store.dispatch(initUser(new User(payload)));
            return;
        } catch (e) {
            console.error(e);
            throw new Error(e.message || e.error);
        }
    },
    checkError: (e) => {
        // console.log('[AuthProvider] checkError', e);
        if ([401 /* , 403 */].includes(e.statusCode) || (e.message && e.message === 'bo.token_expired')) {
            authProvider.logout();
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        console.log('[AuthProvider] checkAuth');
        return getUser().soGood ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        removeToken();
        store.dispatch(resetUser());
        return Promise.resolve();
    },
    getIdentity: () => {
        try {
            return Promise.resolve(getUser());
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getPermissions: (args/* { route } */) => {
        const { role } = getUser()?.role;
        return role ? Promise.resolve(role) : Promise.reject();
    },
};
