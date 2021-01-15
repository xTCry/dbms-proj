import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller, OrderController, IOrderJSON, ComponentController, IComponentJSON } from './';
import { pruduct_track, pruduct_trackAttributes, pruduct_trackCreationAttributes } from '../models/pruduct_track';
import { order } from '../models/order';
import { component } from '../models/component';
export type IPruduct_trackJSON = pruduct_trackAttributes & { order: IOrderJSON; component: IComponentJSON; };

export class Pruduct_trackController extends Controller {
    public static model = pruduct_track as ModelCtor<pruduct_track>;

    public static async doCreate(data: pruduct_trackCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<pruduct_trackAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<pruduct_track, pruduct_trackAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<pruduct_trackAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<pruduct_trackAttributes>, urole?: UserRole) {
        return super.doGetList<pruduct_track, pruduct_trackAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<pruduct_trackAttributes> {
        return {
            attributes: ['id', 'order_id', 'component_id', 'quantity', 'date_taken'],
            include: [
                {
                    // @ts-ignore
                    model: order,
                    ...OrderController.fullAttr(safe, urole, ++deep),
                },

                {
                    // @ts-ignore
                    model: component,
                    ...ComponentController.fullAttr(safe, urole, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}