import { ModelCtor, FindOptions, Op } from 'sequelize';
import { group } from '../models/group';
import { student, studentAttributes, studentCreationAttributes } from '../models/student';
import { user } from '../models/user';
import { UserRole } from '../tools/auth';
import { Controller, IUserJSON, UserController, GroupController } from './';

export type IStudentJSON = studentAttributes & { user: IUserJSON };

export class StudentController extends Controller {
    public static model = student as ModelCtor<student>;

    public static async doCreate(data: studentCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<studentAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<student, studentAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<studentAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<studentAttributes>, urole?: UserRole) {
        return super.doGetList<student, studentAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<studentAttributes> {
        return {
            attributes: ['id', 'user_id', 'group_id', 'student_id'],
            include: [
                {
                    // @ts-ignore
                    model: user,
                    ...UserController.fullAttr(safe, urole, ++deep),
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
