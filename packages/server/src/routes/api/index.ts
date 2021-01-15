import { Router, json, urlencoded } from 'express';
import logger from 'morgan';
import Boom from '@hapi/boom';
import { authType, UserRole } from '../../tools/auth';
import { crud, Action } from '../../crud';
import authRoute from './auth';
import imagesRoute from './images';

import {
    DolzhnostController,
    UsersController,
} from '../../controllers';

const router = Router();

router.use(logger('dev'));
router.use(json());
router.use(urlencoded({ extended: false }));

// API Routes
router.use('/auth', authRoute);


// Set models controllers

router.use(
    '/users',
    authType.required,
    crud(UsersController, {
        // Запрет дейсвтия для не указаных ролей
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        // Установка ролей для доступа к действию
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.DEKAN],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.DEKAN],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.DEKAN],
        },
        // Дефолтные роли, которые устанавливаются по умолчанию на каждое действие, которое не было определено в `actions`
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/dolzhnost',
    authType.optional,
    crud(DolzhnostController, {
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER, UserRole.USER, UserRole.STUDENT],
    })
);


router.use('/images', imagesRoute);

router.use((req, res, next) => {
    next(Boom.notFound('API Method not found'));
});

export default router;
