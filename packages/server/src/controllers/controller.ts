import { Model, ModelCtor, FindAndCountOptions, FindOptions, Op, WhereOptions } from 'sequelize';
import { uniqBy, flatten } from 'lodash';
import Boom from '@hapi/boom';
import { UserRole } from '../tools/auth';

export abstract class Controller {
    public static model: ModelCtor<any>;

    public static async doCreate<M extends Model>(data: any, _role?: UserRole): Promise<M & any> {
        return this.model.create<M>(data);
    }

    public static async doUpdate<M extends Model, A>(
        options: FindOptions<A>,
        data: A,
        _role?: UserRole
    ): Promise<NonNullable<M & any>> {
        const rec = await this.model.findOne<M>(options);
        if (!rec) {
            throw Boom.notFound('Record not found');
        }
        // @ts-ignore
        return rec?.update(data);
    }

    public static async doGetOne<M extends Model, A = {}>(
        // id: string | number,
        options?: FindOptions<A>,
        _role?: UserRole
    ): Promise<(M & any) | null> {
        // return await this.model.findByPk<M>(id, options);
        return await this.model.findOne<M>(options);
    }

    public static async doGetList<M extends Model, A = {}>(
        options: FindAndCountOptions<A>,
        _role?: UserRole
    ): Promise<{
        rows: (M & any)[];
        count: number;
    }> {
        return await this.model.findAndCountAll<M>({ ...options /* , raw: true */ });
    }

    public static async doDestroy<M extends Model>(id: string | number, _role?: UserRole) {
        const rec = await this.model.findByPk<M>(id);
        if (!rec) {
            throw Boom.notFound('Record not found.');
        }
        await rec.destroy();
        return { id };
    }

    public static async doGetSearchList<M extends Model, _A = {}>(
        _q: string,
        _limit: number,
        _role?: UserRole
    ): Promise<{
        rows: (M & any)[];
        count: number;
    }> {
        throw Boom.badRequest('Search method not implemented');
        // return await this.model.findAndCountAll<M>({ limit, where: { [Op.or]: [] } });
        // return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    /* public static doFind(opts: FindOptions): Promise<any[]> {
        throw Boom.badRequest('Not implemented');
    } */

    public static fullAttr<M extends Model, A = {}>(
        safe = true,
        urole: UserRole = UserRole.NONE,
        deep = 0
    ): FindOptions<A> {
        return {};
    }

    public static sequelizeSearchFields<A extends string[]>(
        searchableFields: A,
        comparator: symbol = Op.like,
        model = this.model
    ) {
        return async (q: string, limit: number, scope: WhereOptions = {}) => {
            const resultChunks = await Promise.all(
                this.prepareQueries(searchableFields)(q, comparator).map((query) =>
                    model.findAll({
                        limit,
                        where: { ...query, ...scope },
                        // raw: true,
                    })
                )
            );

            const rows = uniqBy(flatten(resultChunks).slice(0, limit), 'id');
            return { rows, count: rows.length };
        };
    }

    public static prepareQueries<A extends string[]>(searchableFields: A) {
        return (q: string, comparator: symbol = Op.like): WhereOptions[] => {
            if (!searchableFields) {
                throw new Error('Fields not set');
            }

            const defaultQuery = {
                [Op.or]: searchableFields.map((field) => ({
                    [field]: {
                        [comparator]: `%${q}%`,
                    },
                })),
            };

            const tokens = q.split(/\s+/).filter((token) => token !== '');
            if (tokens.length < 2) {
                return [defaultQuery];
            }

            // query consists of multiple tokens => do multiple searches
            return [
                // priority to unsplit match
                defaultQuery,

                // then search records with all tokens
                {
                    [Op.and]: tokens.map((token) => ({
                        [Op.or]: searchableFields.map((field) => ({
                            [field]: {
                                [comparator]: `%${token}%`,
                            },
                        })),
                    })),
                },

                // then search records with at least one token
                {
                    [Op.or]: tokens.map((token) => ({
                        [Op.or]: searchableFields.map((field) => ({
                            [field]: {
                                [comparator]: `%${token}%`,
                            },
                        })),
                    })),
                },
            ];
        };
    }
}
