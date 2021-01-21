import { ModelCtor, FindOptions } from 'sequelize';
import { group, user, student, studentAttributes, studentCreationAttributes } from '@dbms-proj/models';
import { Controller, IUserJSON, UserController, GroupController } from './';
import Boom from '@hapi/boom';
import { UserRole } from '../tools/auth';

export type IStudentJSON = studentAttributes & { user: IUserJSON };

export class StudentController extends Controller {
    public static model = student as ModelCtor<student>;

    public static async isStudentCompareGood(student_id: number, ruser?: IUserJSON, toThrow = true) {
        const recordStudentByStudent = await this.model.findByPk(student_id);
        const isOk = recordStudentByStudent?.user_id === ruser?.id;
        if (isOk) {
            return recordStudentByStudent;
        }
        if (toThrow) {
            throw Boom.forbidden('bo.role_forbidden');
        }
        return false;
    }

    public static async doCreate(data: studentCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<studentAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<student, studentAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<studentAttributes>, ruser?: IUserJSON) {
        if (!this.checkSuperRole(ruser, [UserRole.TEACHER])) {
            // @ts-ignore
            const student_id = Number(options?.where?.id);
            await this.isStudentCompareGood(student_id, ruser);
        }

        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<studentAttributes>, ruser?: IUserJSON) {
        if (!this.checkSuperRole(ruser, [UserRole.TEACHER])) {
            if (ruser?.role_id === UserRole.STUDENT) {
                const recordStudentByUser = await this.model.findOne({ where: { user_id: ruser?.id } });
                if (!recordStudentByUser) {
                    throw Boom.forbidden('bo.role_forbidden');
                }

                // @ts-ignore
                options.where.id = recordStudentByUser.id;
            }
        }
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
}
