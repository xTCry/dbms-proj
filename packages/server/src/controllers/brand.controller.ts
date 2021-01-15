import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from './';
import { brand, brandAttributes, brandCreationAttributes } from '../models/brand';

export type IBrandJSON = brandAttributes;

export class BrandController extends Controller {
    public static model = brand as ModelCtor<brand>;

    public static async doCreate(data: brandCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<brandAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<brand, brandAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<brandAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<brandAttributes>, urole?: UserRole) {
        return super.doGetList<brand, brandAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<brandAttributes> {
        return {
            attributes: ['id', 'brand'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}