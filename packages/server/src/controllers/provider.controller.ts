import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from './';
import { provider, providerAttributes, providerCreationAttributes } from '../models/provider';

export type IProviderJSON = providerAttributes;

export class ProviderController extends Controller {
    public static model = provider as ModelCtor<provider>;

    public static async doCreate(data: providerCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<providerAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<provider, providerAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<providerAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<providerAttributes>, urole?: UserRole) {
        return super.doGetList<provider, providerAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<providerAttributes> {
        return {
            attributes: ['id', 'vendor', 'city', 'street_home', 'telefone'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}