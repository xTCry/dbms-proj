import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller, MakerController, IMakerJSON, TelefoneController, ITelefoneJSON } from './';
import { component, componentAttributes, componentCreationAttributes } from '../models/component';
import { maker } from '../models/maker';
import { telefone } from '../models/telefone';
export type IComponentJSON = componentAttributes & { maker: IMakerJSON; telefone: ITelefoneJSON; };

export class ComponentController extends Controller {
    public static model = component as ModelCtor<component>;

    public static async doCreate(data: componentCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<componentAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<component, componentAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<componentAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<componentAttributes>, urole?: UserRole) {
        return super.doGetList<component, componentAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<componentAttributes> {
        return {
            attributes: ['id', 'telefone_id', 'maker_id', 'name_component', 'price_install', 'price_client'],
            include: [
                {
                    // @ts-ignore
                    model: maker,
                    ...MakerController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: telefone,
                    ...TelefoneController.fullAttr(safe, urole, ++deep),
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