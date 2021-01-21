import { ModelCtor, FindOptions } from 'sequelize';
import { schedule, student, mark, markAttributes, markCreationAttributes } from '@dbms-proj/models';
import { Controller, IUserJSON, ScheduleController, StudentController } from './';
import Boom from '@hapi/boom';
import { UserRole } from '../tools/auth';

export type IMarkJSON = markAttributes;

export class MarkController extends Controller {
    public static model = mark as ModelCtor<mark>;

    public static async isStudentMarkCompareGood(mark_id: number, ruser?: IUserJSON, toThrow = true) {
        const recordMarkByMark = await this.model.findByPk(mark_id);
        const recordStudentByMark = await student.findByPk(recordMarkByMark?.student_id);
        const isOk = recordStudentByMark?.user_id === ruser?.id;
        if (isOk) {
            return recordStudentByMark;
        }
        if (toThrow) {
            throw Boom.forbidden('bo.role_forbidden');
        }
        return false;
    }

    public static async doCreate(data: markCreationAttributes, ruser?: IUserJSON) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<markAttributes>, data: any, ruser?: IUserJSON) {
        return super.doUpdate<mark, markAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<markAttributes>, ruser?: IUserJSON) {
        if (!this.checkSuperRole(ruser, [UserRole.TEACHER])) {
            // @ts-ignore
            const mark_id = Number(options?.where?.id);
            await this.isStudentMarkCompareGood(mark_id, ruser);
        }

        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<markAttributes>, ruser?: IUserJSON) {
        if (!this.checkSuperRole(ruser, [UserRole.TEACHER])) {
            if (ruser?.role_id === UserRole.STUDENT) {
                const recordStudentByUser = await student.findOne({ where: { user_id: ruser?.id } });
                if (!recordStudentByUser) {
                    throw Boom.forbidden('bo.role_forbidden');
                }

                // @ts-ignore
                options.where.student_id = recordStudentByUser.id;
            }
        }
        
        return super.doGetList<mark, markAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<markAttributes> {
        return {
            attributes: ['id', 'date', 'value', 'student_id', 'schedule_id'],
            include: [
                {
                    // @ts-ignore
                    model: schedule,
                    ...ScheduleController.fullAttr(safe, ruser, ++deep),
                },
                {
                    // @ts-ignore
                    model: student,
                    ...StudentController.fullAttr(safe, ruser, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}
