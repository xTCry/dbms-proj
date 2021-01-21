import { ModelCtor, FindOptions } from 'sequelize';
import { group, user, student, studentAttributes, studentCreationAttributes } from '@dbms-proj/models';
import { Controller, IUserJSON, UserController, GroupController } from './';
import { UserRole } from '../tools/auth';

export type IStudentJSON = studentAttributes & { user: IUserJSON };

export class StudentController extends Controller {
    public static model = student as ModelCtor<student>;

    public static async doCreate(data: studentCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<studentAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<student, studentAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<studentAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<studentAttributes>, ruser?: IUserJSON) {
        return super.doGetList<student, studentAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<studentAttributes> {
        return {
            attributes: ['id', 'user_id', 'group_id', 'student_id'],
            include: [
                {
                    // @ts-ignore
                    model: user,
                    ...UserController.fullAttr(safe, ruser, ++deep),
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
