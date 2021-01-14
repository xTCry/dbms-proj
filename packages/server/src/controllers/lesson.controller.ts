import { ModelCtor, FindOptions } from 'sequelize';
import { lesson, lessonAttributes, lessonCreationAttributes } from '../models/lesson';
import { UserRole } from '../tools/auth';
import { Controller } from './controller';

export type ILessonJSON = lessonAttributes;

export class LessonController extends Controller {
    public static model = lesson as ModelCtor<lesson>;

    public static async doCreate(data: lessonCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<lessonAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<lesson, lessonAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<lessonAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<lessonAttributes>, urole?: UserRole) {
        return super.doGetList<lesson, lessonAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<lessonAttributes> {
        return {
            attributes: ['id', 'name'],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}
