import Boom from '@hapi/boom';
import { RequestHandler } from 'express';
import { Controller } from '../controllers/controller';
import { IUsersJSON } from '../controllers/users.controller';
import { RequestWith } from '../tools/auth';

export const getOne = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const { user } = req as RequestWith<{ user?: IUsersJSON }>;
        const record = await ctrl.doGetOne({ where: { id: req.params.id } }, user?.position_id);

        if (!record) {
            return next(Boom.notFound('Record not found'));
        }
        res.jsongo(record);
    } catch (error) {
        next(error);
    }
};
