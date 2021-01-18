import { ModelCtor, FindOptions } from 'sequelize';
import { kafedra, kafedraAttributes, kafedraCreationAttributes } from '@dbms-proj/models';
import { UserRole } from '../tools/auth';
import { Controller } from './controller';

export type IKafedraJSON = kafedraAttributes;

export class KafedraController extends Controller {
    public static model = kafedra as ModelCtor<kafedra>;

    public static async doCreate(data: kafedraCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<kafedraAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<kafedra, kafedraAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<kafedraAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<kafedraAttributes>, urole?: UserRole) {
        return super.doGetList<kafedra, kafedraAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<kafedraAttributes> {
        return {
            attributes: ['id', 'name'],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}
