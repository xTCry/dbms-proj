import { ModelCtor, FindOptions } from 'sequelize';
import { lesson, lessonAttributes, lessonCreationAttributes } from '@dbms-proj/models';
import { UserRole } from '../tools/auth';
import { Controller } from './controller';
import { IUserJSON } from '.';

export type ILessonJSON = lessonAttributes;

export class LessonController extends Controller {
    public static model = lesson as ModelCtor<lesson>;

    public static async doCreate(data: lessonCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<lessonAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<lesson, lessonAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<lessonAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<lessonAttributes>, ruser?: IUserJSON) {
        return super.doGetList<lesson, lessonAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<lessonAttributes> {
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
