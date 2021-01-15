import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller, ModelController, IModelJSON } from './';
import { telefone, telefoneAttributes, telefoneCreationAttributes } from '../models/telefone';
import { model } from '../models/model';
export type ITelefoneJSON = telefoneAttributes & { model: IModelJSON; };

export class TelefoneController extends Controller {
    public static model = telefone as ModelCtor<telefone>;

    public static async doCreate(data: telefoneCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<telefoneAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<telefone, telefoneAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<telefoneAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<telefoneAttributes>, urole?: UserRole) {
        return super.doGetList<telefone, telefoneAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<telefoneAttributes> {
        return {
            attributes: ['id', 'model_id', 'date_issues'],
            include: [
                {
                    // @ts-ignore
                    model: model,
                    ...ModelController.fullAttr(safe, urole, ++deep),
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