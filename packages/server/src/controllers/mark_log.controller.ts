import { ModelCtor, FindOptions } from 'sequelize';
import { mark, mark_log, mark_logAttributes, mark_logCreationAttributes } from '@dbms-proj/models';
import { Controller, IUserJSON, MarkController } from './';

export type IMark_logJSON = mark_logAttributes;

export class Mark_logController extends Controller {
    public static model = mark_log as ModelCtor<mark_log>;

    public static async doCreate(data: mark_logCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<mark_logAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<mark_log, mark_logAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<mark_logAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<mark_logAttributes>, ruser?: IUserJSON) {
        return super.doGetList<mark_log, mark_logAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<mark_logAttributes> {
        return {
            attributes: ['id', 'changed_date', 'last_value', 'new_value', 'mark_id'],
            include: [
                {
                    // @ts-ignore
                    model: mark,
                    ...MarkController.fullAttr(safe, ruser, ++deep),
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
