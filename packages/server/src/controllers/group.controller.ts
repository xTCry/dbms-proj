import { ModelCtor, FindOptions, Op } from 'sequelize';
import { group, groupAttributes, groupCreationAttributes } from '../models/group';
import { specialty } from '../models/specialty';
import { Controller } from './controler';

export type IGroupJSON = groupAttributes;

export class GroupController extends Controller {
    public static model = group as ModelCtor<group>;

    public static async doCreate(data: groupCreationAttributes) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<groupAttributes>, data: any) {
        return super.doUpdate<group, groupAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<groupAttributes>) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(),
        });
    }

    public static async doGetList(options: FindOptions<groupAttributes>) {
        return super.doGetList<group, groupAttributes>({
            ...options,
            ...this.fullAttr(),
        });
    }

    public static async doDestroy(id: string | number) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, deep = 0): FindOptions<groupAttributes> {
        return {
            attributes: ['id', 'name', 'date_formation', 'specialty_id'],
            include: [
                {
                    // @ts-ignore
                    model: specialty,
                    // ...SpecialtyController.fullAttr(safe, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods

    public static async create(attr: groupCreationAttributes) {
        let newRec = await this.model.create({
            ...attr,
        });
        return newRec;
    }
}
