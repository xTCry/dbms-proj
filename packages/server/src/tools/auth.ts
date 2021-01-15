import { set, some } from 'lodash';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Boom from '@hapi/boom';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRole } from '@dbms-proj/utils';
export { UserRole };
import { config } from '../config';
import { UsersController, IUsersJSON } from '../controllers/';

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

export const authRoles = (...allowed: UserRole[]) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isTest = req.query?.test === '1';
    const { user } = req as RequestWith<{ user?: IUsersJSON }>;

    if (isTest || (user?.position_id && some(allowed, (a) => user.position_id === a))) {
        next();
    } else {
        next(Boom.forbidden('bo.role_forbidden'));
    }
};

passport.use(
    new LocalStrategy({}, async (login, password, done) => {
        try {
            // @ts-ignore
            const userRec = await UsersController.model.findOne({ where: { login }, ...UsersController.fullAttr(false) });

            if (!userRec || !UsersController.validatePassword(userRec, password)) {
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
