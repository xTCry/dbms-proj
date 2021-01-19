import { ModelCtor, FindOptions } from 'sequelize';
import {
    auditory,
    teacher,
    lesson,
    group,
    schedule,
    scheduleAttributes,
    scheduleCreationAttributes,
} from '@dbms-proj/models';
import { UserRole } from '../tools/auth';
import { Controller, IAuditoryJSON, ITeacherJSON, TeacherController, GroupController, IGroupJSON, LessonController, AuditoryController } from './';

export type IScheduleJSON = scheduleAttributes & {
    lesson: any;
    teacher: ITeacherJSON;
    auditory: IAuditoryJSON;
    group: IGroupJSON;
};

export class ScheduleController extends Controller {
    public static model = schedule as ModelCtor<schedule>;

    public static async doCreate(data: scheduleCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<scheduleAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<schedule, scheduleAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<scheduleAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<scheduleAttributes>, urole?: UserRole) {
        return super.doGetList<schedule, scheduleAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<scheduleAttributes> {
        return {
            attributes: [
                'id',
                'time_start',
                'date',
                'duration',
                'lesson_type',
                'lesson_id',
                'teacher_id',
                'auditory_id',
                'group_id',
            ],
            include: [
                {
                    // @ts-ignore
                    model: lesson,
                    ...LessonController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: teacher,
                    ...TeacherController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: auditory,
                    ...AuditoryController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: group,
                    ...GroupController.fullAttr(safe, urole, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields([
            'time_start',
            'date',
            'duration',
            'lesson_type',
            'lesson_id',
            'teacher_id',
            'auditory_id',
            'group_id',
        ])(q, limit);
    }

    // Service methods
}
