import { ModelCtor, FindOptions } from 'sequelize';
import { specialty, group, groupAttributes, groupCreationAttributes } from '@dbms-proj/models';
import { UserRole } from '../tools/auth';
import { Controller } from './controller';

export type IGroupJSON = groupAttributes;

export class GroupController extends Controller {
    public static model = group as ModelCtor<group>;

    public static async doCreate(data: groupCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<groupAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<group, groupAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<groupAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<groupAttributes>, urole?: UserRole) {
        return super.doGetList<group, groupAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<groupAttributes> {
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
}
