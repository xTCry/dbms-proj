import { ModelCtor, FindOptions } from 'sequelize';
import { schedule, student, mark, markAttributes, markCreationAttributes } from '@dbms-proj/models';
import { Controller, IUserJSON, ScheduleController, StudentController } from './';

export type IMarkJSON = markAttributes;

export class MarkController extends Controller {
    public static model = mark as ModelCtor<mark>;

    public static async doCreate(data: markCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<markAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<mark, markAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<markAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<markAttributes>, ruser?: IUserJSON) {
        return super.doGetList<mark, markAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<markAttributes> {
        return {
            attributes: ['id', 'date', 'value', 'student_id', 'schedule_id'],
            include: [
                {
                    // @ts-ignore
                    model: schedule,
                    ...ScheduleController.fullAttr(safe, ruser, ++deep),
                },
                {
                    // @ts-ignore
                    model: student,
                    ...StudentController.fullAttr(safe, ruser, ++deep),
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
