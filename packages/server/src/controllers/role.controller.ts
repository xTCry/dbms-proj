import { ModelCtor, FindOptions } from 'sequelize';
import { role, roleAttributes, roleCreationAttributes } from '../models/role';
import { Controller } from './controler';

export type IRoleJSON = roleAttributes;

export class RoleController extends Controller {
    public static model = role as ModelCtor<role>;

    public static async doCreate(data: roleCreationAttributes) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<roleAttributes>, data: any) {
        return super.doUpdate<role, roleAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<roleAttributes>) {
        return super.doGetOne(options);
    }

    public static async doGetList(options: FindOptions<roleAttributes>) {
        return super.doGetList<role, roleAttributes>({
            ...options,
            ...this.fullAttr(),
        });
    }

    public static async doDestroy(id: string | number) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true): FindOptions<roleAttributes> {
        return {
            attributes: ['id', 'name', 'role'],
        };
    }

    // Service methods

    public static async create(attr: roleCreationAttributes) {
        let newRec = await this.model.create({
            ...attr,
        });
        return newRec;
    }
}
