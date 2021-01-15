import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from './';
import { dolzhnost, dolzhnostAttributes, dolzhnostCreationAttributes } from '../models/dolzhnost';

export type IDolzhnostJSON = dolzhnostAttributes;

export class DolzhnostController extends Controller {
    public static model = dolzhnost as ModelCtor<dolzhnost>;

    public static async doCreate(data: dolzhnostCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<dolzhnostAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<dolzhnost, dolzhnostAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<dolzhnostAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<dolzhnostAttributes>, urole?: UserRole) {
        return super.doGetList<dolzhnost, dolzhnostAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<dolzhnostAttributes> {
        return {
            attributes: ['id', 'position'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}