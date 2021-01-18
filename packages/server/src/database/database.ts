import { Sequelize } from 'sequelize';
import { initModels } from '@dbms-proj/models';
import { olog } from '@dbms-proj/utils';
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
            olog.info('DB Connected');
        } catch (err) {
            olog.error('Unable to connected DB');
        }

        try {
            initModels(this.db);
            olog.info('Models was initialised');
        } catch (err) {
            olog.error('Unable to initialize models');
        }
    }
}
