import { ModelCtor, FindOptions } from 'sequelize';
import { kafedra, kafedraAttributes, kafedraCreationAttributes } from '@dbms-proj/models';
import { Controller } from './controller';
import { IUserJSON } from '.';

export type IKafedraJSON = kafedraAttributes;

export class KafedraController extends Controller {
    public static model = kafedra as ModelCtor<kafedra>;

    public static async doCreate(data: kafedraCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<kafedraAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<kafedra, kafedraAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<kafedraAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<kafedraAttributes>, ruser?: IUserJSON) {
        return super.doGetList<kafedra, kafedraAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<kafedraAttributes> {
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
