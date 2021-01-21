import { ModelCtor, FindOptions } from 'sequelize';
import {
    student,
    group,
    headman2group,
    headman2groupAttributes,
    headman2groupCreationAttributes,
} from '@dbms-proj/models';
import { Controller, IStudentJSON, StudentController, GroupController, IGroupJSON, IUserJSON } from './';

export type IHeadman2groupJSON = headman2groupAttributes & { student: IStudentJSON; group: IGroupJSON };

export class Headman2groupController extends Controller {
    public static model = headman2group as ModelCtor<headman2group>;

    public static async doCreate(data: headman2groupCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<headman2groupAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<headman2group, headman2groupAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<headman2groupAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<headman2groupAttributes>, ruser?: IUserJSON) {
        return super.doGetList<headman2group, headman2groupAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<headman2groupAttributes> {
        return {
            attributes: ['id', 'student_id', 'group_id'],
            include: [
                {
                    // @ts-ignore
                    model: student,
                    ...StudentController.fullAttr(safe, ruser, ++deep),
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
        return await this.sequelizeSearchFields([])(q, limit);
    }

    // Service methods
}
