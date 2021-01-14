import { RequestHandler } from 'express';
import { Controller } from '../controllers/controller';
import { IUserJSON } from '../controllers/user.controller';
import { RequestWith } from '../tools/auth';

export const destroy = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const { user } = req as RequestWith<{ user?: IUserJSON }>;
        await ctrl.doDestroy(req.params.id, user?.role_id);
        res.jsongo({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};
