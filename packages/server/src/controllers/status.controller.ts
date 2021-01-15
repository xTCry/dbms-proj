import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from './';
import { status, statusAttributes, statusCreationAttributes } from '../models/status';

export type IStatusJSON = statusAttributes;

export class StatusController extends Controller {
    public static model = status as ModelCtor<status>;

    public static async doCreate(data: statusCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<statusAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<status, statusAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<statusAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<statusAttributes>, urole?: UserRole) {
        return super.doGetList<status, statusAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<statusAttributes> {
        return {
            attributes: ['id', 'status_done'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}