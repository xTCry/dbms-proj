import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller, ProviderController, IProviderJSON, ComponentController, IComponentJSON } from './';
import { buy, buyAttributes, buyCreationAttributes } from '../models/buy';
import { provider } from '../models/provider';
import { component } from '../models/component';
export type IBuyJSON = buyAttributes & { provider: IProviderJSON; component: IComponentJSON; };

export class BuyController extends Controller {
    public static model = buy as ModelCtor<buy>;

    public static async doCreate(data: buyCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<buyAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<buy, buyAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<buyAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<buyAttributes>, urole?: UserRole) {
        return super.doGetList<buy, buyAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<buyAttributes> {
        return {
            attributes: ['id', 'component_id', 'maker_id', 'buy_price', 'quantity', 'date_buy'],
            include: [
                {
                    // @ts-ignore
                    model: provider,
                    ...ProviderController.fullAttr(safe, urole, ++deep),
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