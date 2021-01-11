import { Router, json, urlencoded } from 'express';
import logger from 'morgan';
import Boom from '@hapi/boom';
import { authType, AuthRole } from '../../tools/auth';
import { crud, Action } from '../../crud';
import authRoute from './auth';
// import imagesRoute from './images';

import { UserController } from '../../controllers/user.controller';
import { StudentController } from '../../controllers/student.controller';

const router = Router();

router.use(logger('dev'));
router.use(json());
router.use(urlencoded({ extended: false }));

// API Routes
router.use('/auth', authRoute);


// Set models controllers

router.use(
    '/user',
    authType.optional,
    crud(UserController, {
        // Запрет дейсвтия для не указаных ролей
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        // Установка ролей для доступа к действию
        actions: {
            [Action.CREATE]: [AuthRole.ADMIN],
            [Action.DELETE]: [AuthRole.ADMIN],
            [Action.UPDATE]: [AuthRole.ADMIN],
        },
        // Дефолтные роли, которые устанавливаются по умолчанию на каждое действие, которое не было определено в `actions`
        defaultRoles: [AuthRole.TEACHER, AuthRole.ADMIN],
    })
);

router.use(
    '/student',
    authType.optional,
    crud(StudentController, {
        // Запрет дейсвтия для не указаных ролей
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        // Установка ролей для доступа к действию
        actions: {
            [Action.CREATE]: [AuthRole.ADMIN],
            [Action.DELETE]: [AuthRole.ADMIN],
            [Action.UPDATE]: [AuthRole.ADMIN],
        },
        // Дефолтные роли, которые устанавливаются по умолчанию на каждое действие, которое не было определено в `actions`
        defaultRoles: [AuthRole.TEACHER, AuthRole.ADMIN],
    })
);

// ...
/*
router.use(
    '/orders',
    auth.required,
    crud(OrderModule, {
        actions: {
            [Action.CREATE]: [AuthRole.MODER, AuthRole.ADMIN],
            [Action.DELETE]: [AuthRole.MODER, AuthRole.ADMIN],
            [Action.UPDATE]: [AuthRole.MODER, AuthRole.ADMIN],
        },
        defaultRoles: [AuthRole.USER, AuthRole.MODER, AuthRole.ADMIN],
    })
); */

// router.use('/orders', auth.required, crud(OrderModule));
// router.use('/images', imagesRoute);

router.use((req, res, next) => {
    next(Boom.notFound('API Method not found'));
});

export default router;
