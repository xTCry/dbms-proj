import { Router, json, urlencoded } from 'express';
import logger from 'morgan';
import Boom from '@hapi/boom';
import { authType, UserRole } from '../../tools/auth';
import { crud, Action } from '../../crud';
import authRoute from './auth';
import imagesRoute from './images';

import {
    UserController,
    StudentController,
    RoleController,
    GroupController,
    MarkController,
    ScheduleController,
    TeacherController,
    AuditoryController,
    LessonController,
    KafedraController,
    SpecialtyController,
    Teacher2lessonController,
    Headman2groupController,
} from '../../controllers';

const router = Router();

router.use(logger('dev'));
router.use(json());
router.use(urlencoded({ extended: false }));

// API Routes
router.use('/auth', authRoute);

let superRoles = [UserRole.ADMIN, UserRole.DEKAN];
let defaultRoles = [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER];
let defaultRolesWithStudent = [...defaultRoles, UserRole.STUDENT];

// Set models controllers

router.use(
    '/user',
    authType.required,
    crud(UserController, {
        // Запрет дейсвтия для не указаных ролей
        // disabledActions: [Action.CREATE, Action.GET_LIST, Action.GET_ONE, Action.UPDATE, Action.DELETE],
        // Установка ролей для доступа к действию
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles, UserRole.TEACHER, UserRole.STUDENT],
        },
        // Дефолтные роли, которые устанавливаются по умолчанию на каждое действие, которое не было определено в `actions`
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/role',
    authType.required,
    crud(RoleController, {
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/student',
    authType.required,
    crud(StudentController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles/* , UserRole.STUDENT */],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/group',
    authType.required,
    crud(GroupController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/mark',
    authType.required,
    crud(MarkController, {
        actions: {
            [Action.CREATE]: [...defaultRoles],
            [Action.DELETE]: [...defaultRoles],
            [Action.UPDATE]: [...defaultRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/schedule',
    authType.required,
    crud(ScheduleController, {
        actions: {
            [Action.CREATE]: [...defaultRoles],
            [Action.DELETE]: [...defaultRoles],
            [Action.UPDATE]: [...defaultRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/teacher',
    authType.required,
    crud(TeacherController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles, UserRole.TEACHER],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/auditory',
    authType.required,
    crud(AuditoryController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/lesson',
    authType.required,
    crud(LessonController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/specialty',
    authType.required,
    crud(SpecialtyController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/kafedra',
    authType.required,
    crud(KafedraController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/teacher2lesson',
    authType.required,
    crud(Teacher2lessonController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use(
    '/headman2group',
    authType.required,
    crud(Headman2groupController, {
        actions: {
            [Action.CREATE]: [...superRoles],
            [Action.DELETE]: [...superRoles],
            [Action.UPDATE]: [...superRoles],
        },
        defaultRoles: defaultRolesWithStudent,
    })
);

router.use('/images', imagesRoute);

router.use((req, res, next) => {
    next(Boom.notFound('API Method not found'));
});

export default router;
