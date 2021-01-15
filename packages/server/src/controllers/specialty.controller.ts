import { ModelCtor, FindOptions } from 'sequelize';
import { kafedra } from '../models/kafedra';
import { specialty, specialtyAttributes, specialtyCreationAttributes } from '../models/specialty';
import { UserRole } from '../tools/auth';
import { Controller, IKafedraJSON, KafedraController } from './';

export type ISpecialtyJSON = specialtyAttributes & { kafedra: IKafedraJSON };

export class SpecialtyController extends Controller {
    public static model = specialty as ModelCtor<specialty>;

    public static async doCreate(data: specialtyCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<specialtyAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<specialty, specialtyAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<specialtyAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<specialtyAttributes>, urole?: UserRole) {
        return super.doGetList<specialty, specialtyAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<specialtyAttributes> {
        return {
            attributes: ['id', 'name', 'kafedra_id'],
            include: [
                {
                    // @ts-ignore
                    model: kafedra,
                    ...KafedraController.fullAttr(safe, urole, ++deep),
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
