import decodeJwt from 'jwt-decode';
import store from '../store';
import { graphicAttributes, dolzhnostAttributes, usersAttributes } from '../types';

// User class
export class User implements usersAttributes {
    public id: number;
    public surname: string;
    public name: string;
    public mid_name?: string;
    public photo_employee: string;
    public graphic_id: number;
    public position_id: number;
    public login?: string;
    
    public graphic?: graphicAttributes;
    public dolzhnost?: dolzhnostAttributes;

    public token: string;
    public expiresIn: number;

    constructor(data: usersAttributes) {
        let token = data.token || getToken();

        this.token = token;
        this.expiresIn = Date.now() + (data.expiresIn||6e9) * 1e3;
        try {
            data = decodeJwt(token || '');
            // TODO: calculate from (iat & exp)
            // data.expiresIn = 6e9;
            console.log('decoded Token data', data);
        } catch (e) {}

        this.id = data.id;
        this.surname = data.surname;
        this.name = data.name;
        this.mid_name = data.mid_name;
        this.photo_employee = data.photo_employee;
        this.graphic_id = data.graphic_id;
        this.position_id = data.position_id;
        this.login = data.login;

        this.graphic = data?.graphic;
        this.dolzhnost = data?.dolzhnost;
    }

    public get fullName() {
        return ['last_name', 'name', 'second_name'].map((e) => this[e]).join(' ');
    }

    public get avatar() {
        return this.photo_employee;
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
            surname: 'LastName',
            name: 'Name',
            photo_employee: null,
            graphic_id: 1,
            position_id: 1,
        });
    }
}

const initialState = User.empty();

const RESET_USER = 'UserModule.RESET_USER';
const INIT_USER = 'UserModule.INIT_USER';

const UserModule = (state: User = initialState, action) => {
    switch (action.type) {

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

export default UserModule;
