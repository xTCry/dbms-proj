import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from './';
import { first_inspect, first_inspectAttributes, first_inspectCreationAttributes } from '../models/first_inspect';

export type IFirst_inspectJSON = first_inspectAttributes;

export class First_inspectController extends Controller {
    public static model = first_inspect as ModelCtor<first_inspect>;

    public static async doCreate(data: first_inspectCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<first_inspectAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<first_inspect, first_inspectAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<first_inspectAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<first_inspectAttributes>, urole?: UserRole) {
        return super.doGetList<first_inspect, first_inspectAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<first_inspectAttributes> {
        return {
            attributes: ['id', 'visible_defects', 'comment_client', 'date_inspect'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}