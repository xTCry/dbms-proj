import decodeJwt from 'jwt-decode';
import store from '../store';
import { roleAttributes, userAttributes, UserRole } from '../types';

// User class
export class User implements userAttributes {
    public id: number;
    public photo_path?: string;
    public login: string;
    public name: string;
    public last_name: string;
    public second_name?: string;

    public personal_address: string;
    public personal_telephone: string;
    public personal_birthday: string;
    public registeration_date: string;
    public role_id: number;

    public role?: roleAttributes;
    public token: string;
    public expiresIn: number;

    constructor(data: userAttributes) {
        let token = data.token;
        if (!token) {
            token = getToken();
            try {
                data = decodeJwt(token || '');
                // TODO: calculate from (iat & exp)
                data.expiresIn = 6e9;
                // console.log('decoded Token data', data);
            } catch (e) {}
        }

        this.id = data.id;
        this.photo_path = data.photo_path;
        this.login = data.login;
        this.name = data.name;
        this.last_name = data.last_name;
        this.second_name = data?.second_name;

        this.personal_address = data.personal_address;
        this.personal_telephone = data.personal_telephone;
        this.personal_birthday = data.personal_birthday;
        this.registeration_date = data.registeration_date;
        this.role_id = data.role_id;

        this.role = data?.role;
        this.token = token;
        this.expiresIn = Date.now() + data.expiresIn * 1e3;
    }

    public get fullName() {
        return ['last_name', 'name', 'second_name'].map((e) => this[e]).join(' ');
    }

    public get avatar() {
        return this.photo_path ?? 'qeq';
    }

    public get soGood() {
        return !!this.token && this.checkExpiries;
    }

    public get checkExpiries() {
        return this.expiresIn > Date.now();
    }

    public toRaw() {
        return {
            id: this.id,
            name: this.name,
            token: this.token,
            expiresIn: this.expiresIn,
        };
    }

    public clone() {
        const user = User.empty();
        user.id = this.id;
        user.name = this.name;
        user.token = this.token;
        user.expiresIn = this.expiresIn;
        return user;
    }

    public static empty() {
        return new User({
            id: 9,
            login: 'login',
            last_name: 'LastName',
            name: 'Name',
            personal_address: '',
            personal_birthday: '2000-06-06',
            personal_telephone: '',
            photo_path: null,
            registeration_date: '2020-12-22',
            role_id: 1,
        });
    }
}

const initialState = User.empty();

// const SET_USER = 'UserModule.SET_USER';
const RESET_USER = 'UserModule.RESET_USER';
const INIT_USER = 'UserModule.INIT_USER';

const UserModule = (state: User = initialState, action) => {
    switch (action.type) {
        // case SET_USER:
        //     let user = state.clone();
        //     action.callback(user);
        //     return user;

        case RESET_USER:
            return initialState;

        case INIT_USER:
            return action.user;

        default:
            return state;
    }
};

export function initUser(user) {
    return { type: INIT_USER, user };
}

/* export function setUser(callback) {
    return { type: SET_USER, callback };
} */

export function resetUser() {
    return { type: RESET_USER };
}

export function setToken(e: string) {
    localStorage.setItem('x-token', e);
}

export function getToken() {
    return localStorage.getItem('x-token');
}

export function removeToken() {
    return localStorage.removeItem('x-token');
}

export function getUser(): User {
    return store.getState().UserModule;
}

/* export const userRoles = Object.values(UserRole)
    .filter((e) => typeof UserRole[e] === 'number')
    .map((name) => ({
        role: UserRole[name],
        code: name,
        name: `resources.roles.data.${name}`,
    })); */

export default UserModule;
