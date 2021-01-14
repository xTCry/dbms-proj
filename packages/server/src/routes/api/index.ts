import { Router, json, urlencoded } from 'express';
import logger from 'morgan';
import Boom from '@hapi/boom';
import { authType, UserRole } from '../../tools/auth';
import { crud, Action } from '../../crud';
import authRoute from './auth';
import imagesRoute from './images';

import { UserController } from '../../controllers/user.controller';
import { StudentController } from '../../controllers/student.controller';
import { RoleController } from '../../controllers/role.controller';
import { GroupController } from '../../controllers/group.controller';
import { MarkController } from '../../controllers/mark.controller';
import { ScheduleController } from '../../controllers/schedule.controller';
import { TeacherController } from '../../controllers/teacher.controller';
import { AuditoryController } from '../../controllers/auditory.controller';
import { LessonController } from '../../controllers/lesson.controller';
import { KafedraController } from '../../controllers/kafedra.controller';
import { SpecialtyController } from '../../controllers/specialty.controller';

const router = Router();

router.use(logger('dev'));
router.use(json());
router.use(urlencoded({ extended: false }));

// API Routes
router.use('/auth', authRoute);


// Set models controllers

router.use(
    '/user',
    authType.required,
    crud(UserController, {
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
    '/role',
    authType.optional,
    crud(RoleController, {
        actions: {
            [Action.CREATE]: [UserRole.ADMIN],
            [Action.DELETE]: [UserRole.ADMIN],
            [Action.UPDATE]: [UserRole.ADMIN],
        },
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER, UserRole.USER, UserRole.STUDENT],
    })
);

router.use(
    '/student',
    authType.required,
    crud(StudentController, {
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.DEKAN],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.DEKAN],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.DEKAN],
        },
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/group',
    authType.required,
    crud(GroupController, {
        actions: {
            [Action.CREATE]: [UserRole.ADMIN, UserRole.DEKAN],
            [Action.DELETE]: [UserRole.ADMIN, UserRole.DEKAN],
            [Action.UPDATE]: [UserRole.ADMIN, UserRole.DEKAN],
        },
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/mark',
    authType.required,
    crud(MarkController, {
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/schedule',
    authType.required,
    crud(ScheduleController, {
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/teacher',
    authType.required,
    crud(TeacherController, {
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/auditory',
    authType.required,
    crud(AuditoryController, {
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/lesson',
    authType.required,
    crud(LessonController, {
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/specialty',
    authType.required,
    crud(SpecialtyController, {
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use(
    '/kafedra',
    authType.required,
    crud(KafedraController, {
        defaultRoles: [UserRole.ADMIN, UserRole.DEKAN, UserRole.TEACHER],
    })
);

router.use('/images', imagesRoute);

router.use((req, res, next) => {
    next(Boom.notFound('API Method not found'));
});

export default router;
