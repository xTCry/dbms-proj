import { Router, json, urlencoded } from 'express';
import logger from 'morgan';
import Boom from '@hapi/boom';
import { authType, UserRole } from '../../tools/auth';
import { crud, Action } from '../../crud';
import authRoute from './auth';
import imagesRoute from './images';

import {
    BrandController,
    BuyController,
    ClientController,
    ComponentController,
    DolzhnostController,
    First_inspectController,
    GraphicController,
    MakerController,
    ModelController,
    OrderController,
    ProviderController,
    Pruduct_trackController,
    Second_inspectController,
    StatusController,
    TelefoneController,
    UsersController,
} from '../../controllers';
import { ReportController } from '../../controllers/report.controller';

const router = Router();

router.use(logger('dev'));
router.use(json());
router.use(urlencoded({ extended: false }));

// API Routes
router.use('/auth', authRoute);

let defaultRoles = [
    UserRole.ADMIN,
    UserRole.ADMIN_WAREHOUSE,
    UserRole.ENGEENER_LEAD,
    UserRole.ENGEENER,
    UserRole.OPERATOR,
];
// Set models controllers

router.use('/report-:sup', ReportController.getRouter());

router.use(
    '/users',
    authType.required,
    crud(UsersController, {
        // Запрет дейсвтия для не указаных ролей
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        // Установка ролей для доступа к действию
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        // Дефолтные роли, которые устанавливаются по умолчанию на каждое действие, которое не было определено в `actions`
        defaultRoles,
    })
);
// Set models controllers

router.use(
    '/brand',
    authType.required,
    crud(BrandController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles,
    })
);

router.use(
    '/buy',
    authType.required,
    crud(BuyController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
        },
        defaultRoles,
    })
);

router.use(
    '/client',
    authType.required,
    crud(ClientController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.OPERATOR],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.OPERATOR],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.OPERATOR],
        },
        defaultRoles,
    })
);

router.use(
    '/component',
    authType.required,
    crud(ComponentController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
        },
        defaultRoles,
    })
);

router.use(
    '/dolzhnost',
    authType.required,
    crud(DolzhnostController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles,
    })
);

router.use(
    '/first_inspect',
    authType.required,
    crud(First_inspectController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.OPERATOR],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.OPERATOR],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.OPERATOR],
        },
        defaultRoles,
    })
);

router.use(
    '/graphic',
    authType.required,
    crud(GraphicController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles,
    })
);

router.use(
    '/maker',
    authType.required,
    crud(MakerController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
        },
        defaultRoles,
    })
);

router.use(
    '/model',
    authType.required,
    crud(ModelController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles,
    })
);

router.use(
    '/order',
    authType.required,
    crud(OrderController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.OPERATOR, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.OPERATOR, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.OPERATOR, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
        },
        defaultRoles,
    })
);

router.use(
    '/provider',
    authType.required,
    crud(ProviderController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE],
        },
        defaultRoles,
    })
);

router.use(
    '/pruduct_track',
    authType.required,
    crud(Pruduct_trackController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
        },
        defaultRoles,
    })
);

router.use(
    '/second_inspect',
    authType.required,
    crud(Second_inspectController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.ENGEENER, UserRole.ENGEENER_LEAD],
        },
        defaultRoles,
    })
);

router.use(
    '/status',
    authType.required,
    crud(StatusController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles,
    })
);

router.use(
    '/telefone',
    authType.required,
    crud(TelefoneController, {
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles,
    })
);

router.use('/images', imagesRoute);

router.use((req, res, next) => {
    next(Boom.notFound('API Method not found'));
});

export default router;
