import { ModelCtor, FindOptions } from 'sequelize';
import { specialty, group, groupAttributes, groupCreationAttributes } from '@dbms-proj/models';
import { Controller } from './controller';
import { IUserJSON, SpecialtyController } from '.';

export type IGroupJSON = groupAttributes;

export class GroupController extends Controller {
    public static model = group as ModelCtor<group>;

    public static async doCreate(data: groupCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<groupAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<group, groupAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<groupAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<groupAttributes>, ruser?: IUserJSON) {
        return super.doGetList<group, groupAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<groupAttributes> {
        return {
            attributes: ['id', 'name', 'date_formation', 'specialty_id'],
            include: [
                {
                    // @ts-ignore
                    model: specialty,
                    ...SpecialtyController.fullAttr(safe, ruser, ++deep),
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
