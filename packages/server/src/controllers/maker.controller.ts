import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from './';
import { maker, makerAttributes, makerCreationAttributes } from '../models/maker';

export type IMakerJSON = makerAttributes;

export class MakerController extends Controller {
    public static model = maker as ModelCtor<maker>;

    public static async doCreate(data: makerCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<makerAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<maker, makerAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<makerAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<makerAttributes>, urole?: UserRole) {
        return super.doGetList<maker, makerAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<makerAttributes> {
        return {
            attributes: ['id', 'maker', 'country_make'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}