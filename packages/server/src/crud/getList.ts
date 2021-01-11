import { RequestHandler } from 'express';
import { Controller } from '../controllers/controler';
import { setGetListHeaders } from './headers';
import { mapValues } from 'lodash';
import Boom from '@hapi/boom';

export const getMany = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    console.log(req.query);
    
    try {
        const { q, limit, offset, order, where } = parseQuery(req.query);

        if (!q) {
            const { rows, count } = await ctrl.doGetList({
                offset,
                limit,
                order /* : [order ?? ['id', 'ASC']] */,
                where,
            });
            setGetListHeaders(res, offset, count, rows.length);
            res.jsongo(rows);
        } else {
            next(Boom.notFound('Search method not implemented'));
        }
    } catch (error) {
        next(error);
    }
};

export const parseQuery = (query: any, filterOpt?: any) => {
    const { range, sort, filter } = query;
    const [from, to] = range ? range.map((e: string) => parseInt(e)) : [0, 100];
    const where = mapValues(filter, (v, k) => (filterOpt && filterOpt[k] && filterOpt[k](v)) || v);

    return {
        q: null,
        offset: from,
        limit: to - from + 1,
        order: [sort ?? ['id', 'ASC']] as [[string, string]],
        where,
    };
};
