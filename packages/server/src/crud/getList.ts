import { RequestHandler } from 'express';
import { Controller } from '../controllers/controller';
import { setGetListHeaders } from './headers';
import { mapValues } from 'lodash';
import Boom from '@hapi/boom';
import { RequestWith } from '../tools/auth';
import { IUsersJSON } from '../controllers/users.controller';

export const getMany = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const { q, limit, offset, order, where } = parseQuery(req.query);
        let rows: any[] = [];
        let count: number = 0;

        const { user } = req as RequestWith<{ user?: IUsersJSON }>;
        if (!q) {
            ({ rows, count } = await ctrl.doGetList(
                {
                    offset,
                    limit,
                    order /* : [order ?? ['id', 'ASC']] */,
                    where,
                },
                user?.position_id
            ));
        } else {
            if (!ctrl.doGetSearchList) {
                return next(Boom.badRequest('Search method not implemented'));
            }
            ({ rows, count } = await ctrl.doGetSearchList(q, limit, user?.position_id));
        }

        setGetListHeaders(res, offset, count, rows.length);
        res.jsongo(rows);
    } catch (error) {
        next(error);
    }
};

export const parseQuery = (query: any, filterOpt?: any) => {
    const { range, sort, filter } = query;
    const { q, ...filters } = filter ?? {};
    const [from, to] = range ? range.map((e: string) => parseInt(e)) : [0, 100];
    const where = mapValues(filters, (v, k) => (filterOpt && filterOpt[k] && filterOpt[k](v)) || v);

    return {
        q,
        offset: from,
        limit: to - from + 1,
        order: [sort ?? ['id', 'ASC']] as [[string, string]],
        where,
    };
};
