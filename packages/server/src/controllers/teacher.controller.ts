import { ModelCtor, FindOptions } from 'sequelize';
import { user, teacher, teacherAttributes, teacherCreationAttributes } from '@dbms-proj/models';
import { Controller, IUserJSON, UserController } from './';

export type ITeacherJSON = teacherAttributes & { user: IUserJSON };

export class TeacherController extends Controller {
    public static model = teacher as ModelCtor<teacher>;

    public static async doCreate(data: teacherCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<teacherAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<teacher, teacherAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<teacherAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<teacherAttributes>, ruser?: IUserJSON) {
        return super.doGetList<teacher, teacherAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<teacherAttributes> {
        return {
            attributes: ['id', 'experience', 'user_id'],
            include: [
                {
                    // @ts-ignore
                    model: user,
                    ...UserController.fullAttr(safe, ruser, ++deep),
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
