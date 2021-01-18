import { ModelCtor, FindOptions } from 'sequelize';
import {
    teacher,
    lesson,
    teacher2lesson,
    teacher2lessonAttributes,
    teacher2lessonCreationAttributes,
} from '@dbms-proj/models';
import { UserRole } from '../tools/auth';
import { Controller, ILessonJSON, LessonController, ITeacherJSON, TeacherController } from './';

export type ITeacher2lessonJSON = teacher2lessonAttributes & { teacher: ITeacherJSON; lesson: ILessonJSON };

export class Teacher2lessonController extends Controller {
    public static model = teacher2lesson as ModelCtor<teacher2lesson>;

    public static async doCreate(data: teacher2lessonCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<teacher2lessonAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<teacher2lesson, teacher2lessonAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<teacher2lessonAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<teacher2lessonAttributes>, urole?: UserRole) {
        return super.doGetList<teacher2lesson, teacher2lessonAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<teacher2lessonAttributes> {
        return {
            attributes: ['id', 'teacher_id', 'lesson_id'],
            include: [
                {
                    // @ts-ignore
                    model: teacher,
                    ...TeacherController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: lesson,
                    ...LessonController.fullAttr(safe, urole, ++deep),
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
