import { ModelCtor, FindOptions, QueryTypes } from 'sequelize';
import { authRoles, UserRole } from '../tools/auth';
import { Controller } from './';
import { client, clientAttributes, clientCreationAttributes } from '../models/client';
import { Database } from '../database';
import { json, Router } from 'express';
import { setGetListHeaders } from '../crud/headers';
import { parseQuery } from '../crud/getList';

export type IClientJSON = clientAttributes;

export class ClientController extends Controller {
    public static model = client as ModelCtor<client>;

    public static async doCreate(data: clientCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<clientAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<client, clientAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<clientAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<clientAttributes>, urole?: UserRole) {
        return super.doGetList<client, clientAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<clientAttributes> {
        return {
            attributes: ['id', 'surname', 'name', 'mid_name', 'mob_telefone'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}
