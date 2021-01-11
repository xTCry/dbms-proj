import { RequestHandler } from 'express';
import { Controller } from '../controllers/controler';

export const destroy = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        await ctrl.doDestroy(req.params.id);
        res.jsongo({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};
