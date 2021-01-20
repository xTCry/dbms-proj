import { Sequelize } from 'sequelize';
import { initModels } from '@dbms-proj/models';
import { slog } from '@dbms-proj/utils';
import { config } from '../config';

interface DBConfig {
    database: string;
    username: string;
    password?: string | undefined;
    host?: string | undefined;
    port?: number | undefined;
}

export class Database {
    private static _inst: Database;
    public db: Sequelize;
    public static log = slog.scope('SQL');

    constructor(c: DBConfig) {
        this.db = new Sequelize(c.database, c.username, c.password, {
            dialect: 'mssql',
            host: c.host,
            port: c.port,
            dialectOptions: {
                options: {
                    validateBulkLoadParameters: true,
                },
            },
            logging(sql: string, timing?: number | undefined) {
                Database.log.db(sql);
            },
        });
    }

    public static instance(c?: DBConfig) {
        if (!this._inst) {
            this._inst = new Database(
                c ?? {
                    host: config.get('db.host'),
                    port: config.get('db.port'),
                    username: config.get('db.user'),
                    password: config.get('db.password'),
                    database: config.get('db.database'),
                }
            );
        }
        return this._inst;
    }

    public static get db() {
        return this.instance().db;
    }

    public async init() {
        try {
            await this.db.authenticate();
            // await this.db.sync();
            Database.log.info('DB Connected');
        } catch (err) {
            Database.log.error('Unable to connected DB');
        }

        try {
            initModels(this.db);
            Database.log.info('Models was initialised');
        } catch (err) {
            Database.log.error('Unable to initialize models');
        }
    }
}
