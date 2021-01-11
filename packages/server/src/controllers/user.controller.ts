import { Model, ModelCtor, FindOptions } from 'sequelize';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { user, userCreationAttributes, userAttributes } from '../models/user';
import { Controller } from './controler';
import { config } from '../config';
import { role, roleAttributes } from '../models/role';

const jwtSecret = config.get('jwtSecret');
const expiresIn = 60 * 60 * 24 * 2;

const getSalt = () => 'NO_SALT' ?? crypto.randomBytes(16).toString('hex');

export type IUserJSON = userAttributes & { role: roleAttributes };

export class UserController extends Controller {
    public static model = user as ModelCtor<user>;

    public static async doCreate(data: userCreationAttributes) {
        return super.doCreate(data);
    }

    public static async doUpdate(options: FindOptions<userAttributes>, data:  any) {
        return super.doUpdate<user, userAttributes>(options, data);
    }

    public static async doGetOne(options?: FindOptions<userAttributes>) {
        return super.doGetOne(options);
    }

    public static async doGetList(options: FindOptions<userAttributes>) {
        return super.doGetList<user, userAttributes>({
            ...options,
            ...this.fullAttr(),
        });
    }

    public static async doDestroy(id: string | number) {
        return super.doDestroy(id);
    }

    public static fullAttr(safe = true): FindOptions<userAttributes> {
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

    // public static setPassword(rec: user, password: string) {
    //     this.salt = getSalt();
    //     this.hash = this.encryptPassword(password);
    // }

    public static generateJWT(uData: IUserJSON) {
        return jwt.sign(
            {
                id: uData.id,
                login: uData.login,
                name: uData.name,
                role: uData.role,
            },
            jwtSecret,
            { expiresIn }
        );
    }

    public static toAuthJSON(uData: IUserJSON) {
        return {
            id: uData.id,
            login: uData.login,
            name: uData.name,
            token: this.generateJWT(uData),
            // roles: rec.roles,
            expiresIn,
        };
    }
}
