import { ModelCtor, FindOptions } from 'sequelize';
import { kafedra, specialty, specialtyAttributes, specialtyCreationAttributes } from '@dbms-proj/models';
import { UserRole } from '../tools/auth';
import { Controller, IKafedraJSON, IUserJSON, KafedraController } from './';

export type ISpecialtyJSON = specialtyAttributes & { kafedra: IKafedraJSON };

export class SpecialtyController extends Controller {
    public static model = specialty as ModelCtor<specialty>;

    public static async doCreate(data: specialtyCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<specialtyAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<specialty, specialtyAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<specialtyAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<specialtyAttributes>, ruser?: IUserJSON) {
        return super.doGetList<specialty, specialtyAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<specialtyAttributes> {
        return {
            attributes: ['id', 'name', 'kafedra_id'],
            include: [
                {
                    // @ts-ignore
                    model: kafedra,
                    ...KafedraController.fullAttr(safe, ruser, ++deep),
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
