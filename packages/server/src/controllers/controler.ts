import { Model, ModelCtor, FindAndCountOptions, FindOptions } from 'sequelize';

/* export type FindOptions = {
    order?: Order;
    limit?: number;
    offset?: number;
    where?: WhereOptions;
}; */

export abstract class Controller {
    public static model: ModelCtor<any>;

    public static async doCreate<M extends Model>(data: any): Promise<M & any> {
        return this.model.create<M>(data);
    }

    public static async doUpdate<M extends Model, A>(options: FindOptions<A>, data: A): Promise<NonNullable<M & any>> {
        const rec = await this.model.findOne<M>(options);
        if (!rec) {
            throw new Error('Record not found');
        }
        // @ts-ignore
        return rec?.update(data);
    }

    public static async doGetOne<M extends Model, A = {}>(
        // id: string | number,
        options?: FindOptions<A>
    ): Promise<(M & any) | null> {
        // return await this.model.findByPk<M>(id, options);
        return await this.model.findOne<M>(options);
    }

    public static async doGetList<M extends Model, A = {}>(
        options: FindAndCountOptions<A>
    ): Promise<{
        rows: (M & any)[];
        count: number;
    }> {
        return await this.model.findAndCountAll<M>({ ...options, raw: true });
    }

    public static async doDestroy<M extends Model>(id: string | number) {
        const rec = await this.model.findByPk<M>(id);
        if (!rec) {
            throw new Error('Record not found.');
        }
        await rec.destroy();
        return { id };
    }

    /* public static doFind(opts: FindOptions): Promise<any[]> {
        throw new Error('Not implemented');
    } */
}
