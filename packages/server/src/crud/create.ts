import { RequestHandler } from 'express';
import { Controller } from '../controllers/controller';
import { IUserJSON } from '../controllers/user.controller';
import { RequestWith } from '../tools/auth';

export const create = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const { user } = req as RequestWith<{ user?: IUserJSON }>;
        const record = await ctrl.doCreate(req.body, user?.role_id);
        res.status(201).jsongo(record);
    } catch (error) {
        next(error);
    }
};
