import { ModelCtor, FindOptions } from 'sequelize';
import { role, roleAttributes, roleCreationAttributes } from '@dbms-proj/models';
import { Controller } from './controller';
import { IUserJSON } from '.';

export type IRoleJSON = roleAttributes;

export class RoleController extends Controller {
    public static model = role as ModelCtor<role>;

    public static async doCreate(data: roleCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<roleAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<role, roleAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<roleAttributes>, ruser?: IUserJSON) {
        return super.doGetOne(options);
    }

    public static async doGetList(options: FindOptions<roleAttributes>, ruser?: IUserJSON) {
        return super.doGetList<role, roleAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<roleAttributes> {
        return {
            attributes: ['id', 'name', 'role'],
        };
    }

    // Service methods
}
