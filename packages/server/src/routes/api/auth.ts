import { Router } from 'express';
import passport from 'passport';
import Boom from '@hapi/boom';
import { authType } from '../../tools/auth';
import { UserController, IUserJSON } from '../../controllers/user.controller';
import { log } from '../../tools/logger';

const router = Router();

router.post('/login', async (req, res, next) =>
    passport.authenticate(
        'local',
        {
            session: false,
        },
        (err, passportUser: IUserJSON, info) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {
                return res.jsongo(UserController.toAuthJSON(passportUser));
            }

            next(Boom.unauthorized('bo.wrong_login_password'));
        }
    )(req, res, next)
);

router.get('/initAdmin', authType.optional, async (req, res, next) => {
    try {
        const user = await UserController.model.findOne({ where: { login: 'admin' } });
        log.debug('user', user);
        
        if (!user) {
            const newUser = await UserController.register({
                login: 'admin',
                password: '123456',
                name: 'Admin',
                last_name: 'Forks',
                personal_address: 'addr',
                personal_telephone: '+0',
                personal_birthday: new Date('06.06.2000').toISOString(),
                registeration_date: new Date(Date.now()).toISOString(),
                role_id: 6,
            });

            log.debug('new user', newUser);
            res.jsongo(UserController.toAuthJSON(newUser));
        } else {
            res.jsongo({ already: true });
        }
    } catch (e) {
        next(e);
    }
});

export default router;
