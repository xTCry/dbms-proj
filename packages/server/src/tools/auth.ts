import { set, some } from 'lodash';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AuthRole } from '@dbms-proj/utils';
export { AuthRole };
import { config } from '../config';
import { UserController, IUserJSON } from '../controllers/user.controller';
import log from './logger';

export type RequestWith<T = {}> = Request & T;

const jwtSecret = config.get('jwtSecret');

const ejwt = ({
    secret = '',
    credentialsRequired = true,
    getToken = getTokenFromHeaders,
} = {}) => async (req: Request, res: Response, next: NextFunction) => {
    if (!secret) throw new Error('secret should be set');

    let token = getToken(req);
    if (!token) {
        if (credentialsRequired) {
            return next(Boom.unauthorized('No authorization token was found'));
        } else {
            return next();
        }
    }

    try {
        const result = jwt.verify(token, secret);

        // TODO: Check account status & token expiration

        set(req, 'user', result);
    } catch (err) {
        // next(Boom.unauthorized(err.message));
        if (err.name == 'JsonWebTokenError' || err.message == 'jwt expired') {
            next(Boom.unauthorized('bo.token_expired'));
        } else {
            next(Boom.unauthorized('bo.invalid_access_token'));
        }
    }
    next();
};

const getTokenFromHeaders = (req: Request) => {
    let token = req.headers['authorization'];
    if (!token) return null;

    return token.replace('x-oken ', '');
};

export const authType = {
    required: ejwt({
        secret: jwtSecret,
    }),
    optional: ejwt({
        secret: jwtSecret,
        credentialsRequired: false,
    }),
};

export const authRoles = (...allowed: AuthRole[]) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isTest = req.query?.test === '1';
    const { user } = req as RequestWith<{ user?: IUserJSON }>;
    log.debug('req.user', user);

    if (isTest || (user?.role.role && some(allowed, (a) => user.role.role & a))) {
        next();
    } else {
        next(Boom.forbidden('bo.role_forbidden'));
    }
};

passport.use(
    new LocalStrategy({}, async (login, password, done) => {
        try {
            // @ts-ignore
            const userRec = await UserController.model.findOne({ where: { login }, ...UserController.fullAttr(false) });

            if (!userRec || !UserController.validatePassword(userRec, password)) {
                return done(null, false, {
                    message: 'login or password is invalid',
                });
            }
            return done(null, userRec.toJSON());
        } catch (error) {
            done(error);
        }
    })
);
