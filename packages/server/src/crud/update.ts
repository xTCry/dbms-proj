import { RequestHandler } from 'express';
import Boom from '@hapi/boom';
import { Controller } from '../controllers/controller';
import { RequestWith } from '../tools/auth';
import { IUsersJSON } from '../controllers/users.controller';

export const update = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const data = req.body;
        let where = {
            id: Number.parseInt((req.params && req.params.id) || (data.filter && data.filter.id)),
        };

        if (!where.id) {
            return next(Boom.badRequest('Bad ids'));
        }
        if (data.filter) {
            delete data.filter;
        }

        const { user } = req as RequestWith<{ user?: IUsersJSON }>;
        const record = await ctrl.doGetOne({ where }, user?.position_id);

        if (!record) {
            return next(Boom.notFound('Record not found'));
        }

        const result = await ctrl.doUpdate({ where }, data);

        res.jsongo(result);
    } catch (error) {
        next(error);
    }
};
