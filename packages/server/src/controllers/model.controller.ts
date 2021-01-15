import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller, BrandController, IBrandJSON } from './';
import { model, modelAttributes, modelCreationAttributes } from '../models/model';
import { brand } from '../models/brand';
export type IModelJSON = modelAttributes & { brand: IBrandJSON; };

export class ModelController extends Controller {
    public static model = model as ModelCtor<model>;

    public static async doCreate(data: modelCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<modelAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<model, modelAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<modelAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<modelAttributes>, urole?: UserRole) {
        return super.doGetList<model, modelAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<modelAttributes> {
        return {
            attributes: ['id', 'model', 'brand_id'],
            include: [
                {
                    // @ts-ignore
                    model: brand,
                    ...BrandController.fullAttr(safe, urole, ++deep),
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