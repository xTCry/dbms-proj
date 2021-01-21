import { ModelCtor, FindOptions } from 'sequelize';
import {
    teacher,
    lesson,
    teacher2lesson,
    teacher2lessonAttributes,
    teacher2lessonCreationAttributes,
} from '@dbms-proj/models';
import { Controller, ILessonJSON, LessonController, ITeacherJSON, TeacherController, IUserJSON } from './';

export type ITeacher2lessonJSON = teacher2lessonAttributes & { teacher: ITeacherJSON; lesson: ILessonJSON };

export class Teacher2lessonController extends Controller {
    public static model = teacher2lesson as ModelCtor<teacher2lesson>;

    public static async doCreate(data: teacher2lessonCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<teacher2lessonAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<teacher2lesson, teacher2lessonAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<teacher2lessonAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<teacher2lessonAttributes>, ruser?: IUserJSON) {
        return super.doGetList<teacher2lesson, teacher2lessonAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<teacher2lessonAttributes> {
        return {
            attributes: ['id', 'teacher_id', 'lesson_id'],
            include: [
                {
                    // @ts-ignore
                    model: teacher,
                    ...TeacherController.fullAttr(safe, ruser, ++deep),
                },
                {
                    // @ts-ignore
                    model: lesson,
                    ...LessonController.fullAttr(safe, ruser, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields([])(q, limit);
    }

    // Service methods
}
