import { FindOptions, QueryTypes } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from '.';
import { json, Router } from 'express';
import { parseQuery } from '../crud/getList';
import { Database } from '../database';
import { setGetListHeaders } from '../crud/headers';
import Boom from '@hapi/boom';

// @ts-ignore
export class ReportController extends Controller {
    public static model = undefined;

    public static async doCreate(data: any, urole?: UserRole) {
        throw Boom.badRequest('Method not implemented');
    }

    public static async doUpdate(options: FindOptions, data: any, urole?: UserRole) {
        throw Boom.badRequest('Method not implemented');
    }

    public static async doGetOne(options?: FindOptions, urole?: UserRole) {
        throw Boom.badRequest('Method not implemented');
    }

    public static async doGetList(options: FindOptions, urole?: UserRole) {
        throw Boom.badRequest('Method not implemented');
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        throw Boom.badRequest('Method not implemented');
    }

    // Service methods

    public static getRouter() {
        const router = Router();
        router.use(json());

        return async (req: any, res: any, next: any) => {
            const { sup } = req.params;
            // res.jsongo({ sup });

            try {
                const { limit, offset, order, where } = parseQuery(req.query);
                console.log(sup);
                console.log(limit, offset, order, where);

                let rows = [];
                let count = 0;

                if (sup === 'remains') {
                    ({ rows, count } = await this.doGetReportRemains({ offset, limit, order, where }));
                } else if (sup === 'client') {
                    ({ rows, count } = await this.doGetReport({ offset, limit, order, where }));
                } else if (sup === 'workload_engineers') {
                    ({ rows, count } = await this.doGetReportWorkloadEngeeners({ offset, limit, order, where }));
                }

                setGetListHeaders(res, offset, count, rows.length);
                res.jsongo(rows);
            } catch (error) {
                next(error);
            }
        };

        /* router.route('/remains').get(
            // authRoles(UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE),
            async (req, res, next) => {
                try {
                    const { limit, offset, order, where } = parseQuery(req.query);

                    const { rows, count } = await this.doGetReportRemains({ offset, limit, order, where });

                    setGetListHeaders(res, offset, count, rows.length);
                    res.jsongo(rows);
                } catch (error) {
                    next(error);
                }
            }
        );
        router.route('/workload_engineers').get(
            // authRoles(UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE),
            async (req, res, next) => {
                try {
                    const { limit, offset, order, where } = parseQuery(req.query);

                    const { rows, count } = await this.doGetReportWorkloadEngeeners({
                        offset,
                        limit,
                        order,
                        where,
                    });

                    setGetListHeaders(res, offset, count, rows.length);
                    res.jsongo(rows);
                } catch (error) {
                    next(error);
                }
            }
        );
        router.route('/client').get(
            // authRoles(UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE),
            async (req, res, next) => {
                try {
                    const { limit, offset, order, where } = parseQuery(req.query);

                    const { rows, count } = await this.doGetReport({ offset, limit, order, where });

                    setGetListHeaders(res, offset, count, rows.length);
                    res.jsongo(rows);
                } catch (error) {
                    next(error);
                }
            }
        ); */
        return router;
    }

    public static async doGetReport(
        options: FindOptions,
        urole?: UserRole
    ): Promise<{ rows: any[]; count: number }> {
        const where = options.where as any;
        let date1 = where?.date1 ? new Date(where.date1) : new Date();
        let date2 = where?.date2 ? new Date(where.date2) : new Date();

        const [rows, count] = await Database.instance().db.query('SELECT * FROM client_serviced (:date1, :date2)', {
            type: QueryTypes.RAW,
            replacements: { date1, date2 },
        });

        return { rows, count } as { rows: any[]; count: number };
    }

    public static async doGetReportRemains(
        options: FindOptions,
        urole?: UserRole
    ): Promise<{ rows: any[]; count: number }> {
        const [rows, count] = await Database.instance().db.query(
            `SELECT
                c.id,
                c.name_component as name_component,
                b.quantity AS 'quantity_start',
                b.quantity - p.quantity AS 'quantity_after_uses'
            FROM component c
                LEFT JOIN buy b ON b.component_id = c.id
                LEFT JOIN pruduct_track p ON p.component_id = c.id`
        );

        return { rows, count } as { rows: any[]; count: number };
    }

    public static async doGetReportWorkloadEngeeners(
        options: FindOptions,
        urole?: UserRole
    ): Promise<{ rows: any[]; count: number }> {
        const [rows, count] = await Database.instance().db.query(
            `SELECT
                u.id, u.surname, u.name, u.mid_name, d.position, o.status_id, Count(*) as 'work_tasks'
            FROM users u
                JOIN [order] o ON o.engineer_id = u.id
                JOIN dolzhnost d ON d.id = u.position_id
                GROUP BY u.id, u.surname, u.name, u.mid_name, d.position, o.status_id
                HAVING (d.position like '%инженер') AND o.status_id = 2;
            `
        );

        return { rows, count } as { rows: any[]; count: number };
    }
}