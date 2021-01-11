import { RequestHandler } from 'express';
import { Controller } from '../controllers/controler';

export const create = (ctrl: typeof Controller): RequestHandler => async (req, res, next) => {
    try {
        const record = await ctrl.doCreate(req.body);
        res.status(201).jsongo(record);
    } catch (error) {
        next(error);
    }
};
