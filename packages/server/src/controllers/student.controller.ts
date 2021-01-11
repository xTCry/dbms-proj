import { ModelCtor, FindOptions } from 'sequelize';
import { group } from '../models/group';
import { student, studentAttributes, studentCreationAttributes } from '../models/student';
import { user } from '../models/user';
import { Controller } from './controler';
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
        return super.doGetOne(options);
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

    public static fullAttr(safe = true): FindOptions<studentAttributes> {
        return {
            attributes: ['id', 'user_id', 'group_id', 'student_id'],
            include: [
                {
                    // @ts-ignore
                    model: user,
                    ...UserController.fullAttr(safe),
                },
                {
                    // @ts-ignore
                    model: group,
                    // ...UserController.fullAttr(safe),
                },
            ],
        };
    }

    // Service methods

    public static async create(attr: studentCreationAttributes) {
        let newRec = await this.model.create({
            ...attr,
        });
        return newRec;
    }
}
