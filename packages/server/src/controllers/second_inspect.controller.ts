import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from './';
import { second_inspect, second_inspectAttributes, second_inspectCreationAttributes } from '../models/second_inspect';

export type ISecond_inspectJSON = second_inspectAttributes;

export class Second_inspectController extends Controller {
    public static model = second_inspect as ModelCtor<second_inspect>;

    public static async doCreate(data: second_inspectCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<second_inspectAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<second_inspect, second_inspectAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<second_inspectAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<second_inspectAttributes>, urole?: UserRole) {
        return super.doGetList<second_inspect, second_inspectAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<second_inspectAttributes> {
        return {
            attributes: ['id', 'fault', 'price_diagnose', 'date_inspect'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}