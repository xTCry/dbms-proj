import { Router } from 'express';
import passport from 'passport';
import Boom from '@hapi/boom';
import { authType } from '../../tools/auth';
import { UsersController, IUsersJSON } from '../../controllers/users.controller';
import { log } from '../../tools/logger';

const router = Router();

router.post('/login', async (req, res, next) =>
    passport.authenticate(
        'local',
        {
            session: false,
        },
        (err, passportUser: IUsersJSON, info) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {
                return res.jsongo(UsersController.toAuthJSON(passportUser));
            }

            next(Boom.unauthorized('bo.wrong_login_password'));
        }
    )(req, res, next)
);

router.get('/initAdmin', authType.optional, async (req, res, next) => {
    try {
        const user = await UsersController.model.findOne({ where: { login: 'admin' } });
        log.debug('user', user);
        
        if (!user) {
            const newUser = await UsersController.register({
                login: 'admin',
                password: '123456',
                name: 'Admin',
                surname: 'for',
                mid_name: 'panel',
                photo_employee: 'none',
                position_id: 5,
                graphic_id: 1,
            });

            log.debug('new user', newUser);
            res.jsongo(UsersController.toAuthJSON(newUser));
        } else {
            res.jsongo({ already: true });
        }
    } catch (e) {
        next(e);
    }
});

export default router;
