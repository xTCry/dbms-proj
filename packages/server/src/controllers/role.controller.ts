import { ModelCtor, FindOptions } from 'sequelize';
import { role, roleAttributes, roleCreationAttributes } from '@dbms-proj/models';
import { UserRole } from '../tools/auth';
import { Controller } from './controller';

export type IRoleJSON = roleAttributes;

export class RoleController extends Controller {
    public static model = role as ModelCtor<role>;

    public static async doCreate(data: roleCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<roleAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<role, roleAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<roleAttributes>, urole?: UserRole) {
        return super.doGetOne(options);
    }

    public static async doGetList(options: FindOptions<roleAttributes>, urole?: UserRole) {
        return super.doGetList<role, roleAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<roleAttributes> {
        return {
            attributes: ['id', 'name', 'role'],
        };
    }

    // Service methods
}
