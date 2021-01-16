import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import {
    Controller,
    TelefoneController,
    ITelefoneJSON,
    StatusController,
    IStatusJSON,
    UsersController,
    IUsersJSON,
    First_inspectController,
    IFirst_inspectJSON,
    Second_inspectController,
    ISecond_inspectJSON,
    ClientController,
    IClientJSON,
} from './';
import { order, orderAttributes, orderCreationAttributes } from '../models/order';
import { telefone } from '../models/telefone';
import { status } from '../models/status';
import { users } from '../models/users';
import { first_inspect } from '../models/first_inspect';
import { second_inspect } from '../models/second_inspect';
import { client } from '../models/client';
export type IOrderJSON = orderAttributes & {
    telefone: ITelefoneJSON;
    status: IStatusJSON;
    users: IUsersJSON;
    first_inspect: IFirst_inspectJSON;
    second_inspect: ISecond_inspectJSON;
    client: IClientJSON;
};

export const objFilter = (obj: any, validParams: string[]) => {
    if (!validParams) {
        return obj;
    }
    let result: any = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && validParams.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
};

export class OrderController extends Controller {
    public static model = order as ModelCtor<order>;

    public static async doCreate(data: orderCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<orderAttributes>, data: any, urole?: UserRole) {
        console.log('data', data);
        let attributes: any = this.fullAttr(false).attributes;
        return super.doUpdate<order, orderAttributes>(options, objFilter(data, attributes));
    }

    public static async doGetOne(options?: FindOptions<orderAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<orderAttributes>, urole?: UserRole) {
        return super.doGetList<order, orderAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<orderAttributes> {
        return {
            attributes: [
                'id',
                'telefone_id',
                'status_id',
                'operator_id',
                'engineer_id',
                'first_inspect_id',
                'second_inspect_id',
                'client_id',
                'date_accept',
                'date_issues',
                'price_repair',
            ],
            include: [
                {
                    // @ts-ignore
                    model: telefone,
                    ...TelefoneController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: status,
                    ...StatusController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: users,
                    as: 'operator',
                    ...UsersController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: users,
                    as: 'engineer',
                    ...UsersController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: first_inspect,
                    ...First_inspectController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: second_inspect,
                    ...Second_inspectController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: client,
                    ...ClientController.fullAttr(safe, urole, ++deep),
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
