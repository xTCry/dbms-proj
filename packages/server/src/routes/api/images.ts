import { Router } from 'express';
import Boom from '@hapi/boom';
import { authType, UserRole, authRoles } from '../../tools/auth';
import { upload } from '../../tools/upload';

const router = Router();

router.get('/', (req, res) => {
    res.jsongo({ hi: 'low' });
});
router.post(
    '/',
    authType.required,
    authRoles(UserRole.ADMIN, UserRole.ADMIN_WAREHOUSE, UserRole.ENGEENER, UserRole.ENGEENER_LEAD, UserRole.OPERATOR),
    upload.array('images', 10),
    async (req, res, next) => {
        try {
            const { files } = req;
            let images = [];

            if (!files) {
                throw Boom.badRequest('Empty images');
            }

            for (const img of files) {
                images.push({
                    filename: img.filename,
                    originalname: img.originalname,
                    path: img.path.replace(/\\/g, '/'), //.replace(/^uploads/i, ''),
                });
            }

            res.jsongo({ images });
        } catch (e) {
            next(e);
        }
    }
);

export default router;
