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
import {
    Controller,
    IAuditoryJSON,
    ITeacherJSON,
    TeacherController,
    GroupController,
    IGroupJSON,
    LessonController,
    AuditoryController,
    IUserJSON,
} from './';

export type IScheduleJSON = scheduleAttributes & {
    lesson: any;
    teacher: ITeacherJSON;
    auditory: IAuditoryJSON;
    group: IGroupJSON;
};

export class ScheduleController extends Controller {
    public static model = schedule as ModelCtor<schedule>;

    public static async doCreate(data: scheduleCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<scheduleAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<schedule, scheduleAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<scheduleAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<scheduleAttributes>, ruser?: IUserJSON) {
        return super.doGetList<schedule, scheduleAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<scheduleAttributes> {
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
                    ...LessonController.fullAttr(safe, ruser, ++deep),
                },
                {
                    // @ts-ignore
                    model: teacher,
                    ...TeacherController.fullAttr(safe, ruser, ++deep),
                },
                {
                    // @ts-ignore
                    model: auditory,
                    ...AuditoryController.fullAttr(safe, ruser, ++deep),
                },
                {
                    // @ts-ignore
                    model: group,
                    ...GroupController.fullAttr(safe, ruser, ++deep),
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
