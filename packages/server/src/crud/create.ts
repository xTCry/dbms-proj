import { RequestHandler } from 'express';
import { Controller } from '../controllers/controller';
import { IUsersJSON } from '../controllers/users.controller';
import { RequestWith } from '../tools/auth';

export const create = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const { user } = req as RequestWith<{ user?: IUsersJSON }>;
        const record = await ctrl.doCreate(req.body, user?.position_id);
        res.status(201).jsongo(record);
    } catch (error) {
        next(error);
    }
};
