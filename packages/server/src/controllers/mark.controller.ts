import { ModelCtor, FindOptions } from 'sequelize';
import { mark, markAttributes, markCreationAttributes } from '../models/mark';
import { schedule } from '../models/schedule';
import { student } from '../models/student';
import { Controller } from './controler';
import { StudentController } from './student.controller';

export type IMarkJSON = markAttributes;

export class MarkController extends Controller {
    public static model = mark as ModelCtor<mark>;

    public static async doCreate(data: markCreationAttributes) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<markAttributes>, data: any) {
        return super.doUpdate<mark, markAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<markAttributes>) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(),
        });
    }

    public static async doGetList(options: FindOptions<markAttributes>) {
        return super.doGetList<mark, markAttributes>({
            ...options,
            ...this.fullAttr(),
        });
    }

    public static async doDestroy(id: string | number) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, deep = 0): FindOptions<markAttributes> {
        return {
            attributes: ['id', 'date', 'value', 'student_id', 'schedule_id'],
            include: [
                {
                    // @ts-ignore
                    model: schedule,
                    // ...ScheduleController.fullAttr(safe, ++deep),
                },
                {
                    // @ts-ignore
                    model: student,
                    ...StudentController.fullAttr(safe, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods

    public static async create(attr: markCreationAttributes) {
        let newRec = await this.model.create({
            ...attr,
        });
        return newRec;
    }
}
