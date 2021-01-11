import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import Boom from '@hapi/boom';
import log from 'signale';

import { appLogger } from './tools/appLogger';
import './database';
import apiRoutes from './routes/api';

// Error handler
const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    log.watch(err.toString());

    if (err.statusCode) {
        res.status(err.statusCode).json(err);
        return;
    }

    if (err.isBoom) {
        const { statusCode, payload } = err.output;
        res.status(statusCode).json(payload);
        return;
    }

    const defaultError = Boom.badImplementation(err.message || 'An internal server error occurred');
    const { statusCode, payload } = defaultError.output;
    res.status(statusCode).json(payload);
};

export async function createApp() {
    const app = express();

    appLogger(app);

    app
        // Backend middleware
        .use((req, res, next) => {
            res.jsongo = (e: any) => res.json({ response: e });
            next();
        })
        .use(cors())

        .use('/api', apiRoutes)
        .use('/uploads', express.static('./uploads'))

        // Default 404
        .use((req, res, next) => {
            next(Boom.notFound());
        })

        .use(errHandler);

    return app;
}
