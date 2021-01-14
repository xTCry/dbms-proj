import { ModelCtor, FindOptions } from 'sequelize';
import { group } from '../models/group';
import { teacher, teacherAttributes, teacherCreationAttributes } from '../models/teacher';
import { user } from '../models/user';
import { UserRole } from '../tools/auth';
import { Controller } from './controller';
import { GroupController } from './group.controller';
import { IUserJSON, UserController } from './user.controller';

export type ITeacherJSON = teacherAttributes & { user: IUserJSON };

export class TeacherController extends Controller {
    public static model = teacher as ModelCtor<teacher>;

    public static async doCreate(data: teacherCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<teacherAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<teacher, teacherAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<teacherAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<teacherAttributes>, urole?: UserRole) {
        return super.doGetList<teacher, teacherAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<teacherAttributes> {
        return {
            attributes: ['id', 'experience', 'user_id'],
            include: [
                {
                    // @ts-ignore
                    model: user,
                    ...UserController.fullAttr(safe, urole, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['experience'])(q, limit);
    }

    // Service methods

    public static async create(attr: teacherCreationAttributes) {
        let newRec = await this.model.create({
            ...attr,
        });
        return newRec;
    }
}
