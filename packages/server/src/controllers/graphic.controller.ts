import { ModelCtor, FindOptions } from 'sequelize';
import { UserRole } from '../tools/auth';
import { Controller } from './';
import { graphic, graphicAttributes, graphicCreationAttributes } from '../models/graphic';

export type IGraphicJSON = graphicAttributes;

export class GraphicController extends Controller {
    public static model = graphic as ModelCtor<graphic>;

    public static async doCreate(data: graphicCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<graphicAttributes>, data: any, urole?: UserRole) {
        return super.doUpdate<graphic, graphicAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<graphicAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<graphicAttributes>, urole?: UserRole) {
        return super.doGetList<graphic, graphicAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<graphicAttributes> {
        return {
            attributes: ['id', 'graphic_work', 'graphic_hours'],
            include: [],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods
}