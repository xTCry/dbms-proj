import { ModelCtor, FindOptions } from 'sequelize';
import {
    student,
    group,
    headman2group,
    headman2groupAttributes,
    headman2groupCreationAttributes,
} from '@dbms-proj/models';
import { UserRole } from '../tools/auth';
import { Controller, IStudentJSON, StudentController, GroupController, IGroupJSON } from './';

export type IHeadman2groupJSON = headman2groupAttributes & { student: IStudentJSON; group: IGroupJSON };

export class Headman2groupController extends Controller {
    public static model = headman2group as ModelCtor<headman2group>;

    public static async doCreate(data: headman2groupCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<headman2groupAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<headman2group, headman2groupAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<headman2groupAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<headman2groupAttributes>, urole?: UserRole) {
        return super.doGetList<headman2group, headman2groupAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<headman2groupAttributes> {
        return {
            attributes: ['id', 'student_id', 'group_id'],
            include: [
                {
                    // @ts-ignore
                    model: student,
                    ...StudentController.fullAttr(safe, urole, ++deep),
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
        return await this.sequelizeSearchFields([])(q, limit);
    }

    // Service methods
}
