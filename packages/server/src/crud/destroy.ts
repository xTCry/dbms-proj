import { olog } from '@dbms-proj/utils';
import Boom from '@hapi/boom';
import { RequestHandler } from 'express';
import { Controller } from '../controllers/controller';
import { IUserJSON } from '../controllers/user.controller';
import { RequestWith } from '../tools/auth';

export const destroy = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const { user } = req as RequestWith<{ user?: IUserJSON }>;

        if (req.params.id) {
            const { id } = req.params;
            await ctrl.doDestroy(id, user);
            res.jsongo({ id });
        } else {
            const query = req.query as any;
            olog.debug('query', query);

            const ids = query.filter.id;
            olog.debug('ids', ids);

            return next(Boom.notImplemented('Delete not worked'));
        }
    } catch (error) {
        next(error);
    }
};
