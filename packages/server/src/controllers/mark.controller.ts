import { ModelCtor, FindOptions } from 'sequelize';
import { mark, markAttributes, markCreationAttributes } from '../models/mark';
import { schedule } from '../models/schedule';
import { student } from '../models/student';
import { UserRole } from '../tools/auth';
import { Controller } from './controller';
import { ScheduleController } from './schedule.controller';
import { StudentController } from './student.controller';

export type IMarkJSON = markAttributes;

export class MarkController extends Controller {
    public static model = mark as ModelCtor<mark>;

    public static async doCreate(data: markCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<markAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<mark, markAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<markAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<markAttributes>, urole?: UserRole) {
        return super.doGetList<mark, markAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<markAttributes> {
        return {
            attributes: ['id', 'date', 'value', 'student_id', 'schedule_id'],
            include: [
                {
                    // @ts-ignore
                    model: schedule,
                    ...ScheduleController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: student,
                    ...StudentController.fullAttr(safe, urole, ++deep),
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
