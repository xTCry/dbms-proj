import { RequestHandler } from 'express';
import { Controller } from '../controllers/controller';
import { IUsersJSON } from '../controllers/users.controller';
import { RequestWith } from '../tools/auth';

export const destroy = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const { user } = req as RequestWith<{ user?: IUsersJSON }>;
        await ctrl.doDestroy(req.params.id, user?.position_id);
        res.jsongo({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};
