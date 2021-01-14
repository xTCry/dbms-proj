import { ModelCtor, FindOptions } from 'sequelize';
import { auditory, auditoryAttributes, auditoryCreationAttributes } from '../models/auditory';
import { UserRole } from '../tools/auth';
import { Controller } from './controller';

export type IAuditoryJSON = auditoryAttributes;

export class AuditoryController extends Controller {
    public static model = auditory as ModelCtor<auditory>;

    public static async doCreate(data: auditoryCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<auditoryAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<auditory, auditoryAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<auditoryAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<auditoryAttributes>, urole?: UserRole) {
        return super.doGetList<auditory, auditoryAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<auditoryAttributes> {
        return {
            attributes: ['id', 'name', 'corpus'],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name', 'corpus'])(q, limit);
    }

    // Service methods
}
