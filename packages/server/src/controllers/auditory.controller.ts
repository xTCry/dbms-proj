import { ModelCtor, FindOptions } from 'sequelize';
import { auditory, auditoryAttributes, auditoryCreationAttributes } from '@dbms-proj/models';
import { Controller } from './controller';
import { IUserJSON } from '.';

export type IAuditoryJSON = auditoryAttributes;

export class AuditoryController extends Controller {
    public static model = auditory as ModelCtor<auditory>;

    public static async doCreate(data: auditoryCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<auditoryAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<auditory, auditoryAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<auditoryAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<auditoryAttributes>, ruser?: IUserJSON) {
        return super.doGetList<auditory, auditoryAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<auditoryAttributes> {
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
