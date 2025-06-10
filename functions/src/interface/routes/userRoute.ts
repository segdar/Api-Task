import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

router.post('/', userController.cretedUser.bind(userController));
router.get('/:email', userController.getId.bind(userController));
export default router;