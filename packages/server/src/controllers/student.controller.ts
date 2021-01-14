import { ModelCtor, FindOptions, Op } from 'sequelize';
import { group } from '../models/group';
import { student, studentAttributes, studentCreationAttributes } from '../models/student';
import { user } from '../models/user';
import { Controller } from './controller';
import { GroupController } from './group.controller';
import { IUserJSON, UserController } from './user.controller';

export type IStudentJSON = studentAttributes & { user: IUserJSON };

export class StudentController extends Controller {
    public static model = student as ModelCtor<student>;

    public static async doCreate(data: studentCreationAttributes) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<studentAttributes>, data: any) {
        return super.doUpdate<student, studentAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<studentAttributes>) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(),
        });
    }

    public static async doGetList(options: FindOptions<studentAttributes>) {
        return super.doGetList<student, studentAttributes>({
            ...options,
            ...this.fullAttr(),
        });
    }

    public static async doDestroy(id: string | number) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, deep = 0): FindOptions<studentAttributes> {
        return {
            attributes: ['id', 'user_id', 'group_id', 'student_id'],
            include: [
                {
                    // @ts-ignore
                    model: user,
                    ...UserController.fullAttr(safe, ++deep),
                },
                {
                    // @ts-ignore
                    model: group,
                    ...GroupController.fullAttr(safe, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['student_id'])(q, limit);
    }

    // Service methods

    public static async create(attr: studentCreationAttributes) {
        let newRec = await this.model.create({
            ...attr,
        });
        return newRec;
    }
}
