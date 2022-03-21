import { Router } from 'express';
import {
  validateShape,
  validateAuth,
  paginate,
  getUser,
  verifyUserPermission,
} from '../middlewares';
import {
  createUserShape,
  loginUserShape,
  updateUserEmailShape,
} from '../shapes';
import { USERS } from '../configs';

import {
  createUserController,
  loginUserController,
  retrieveUserController,
  retrieveUserByIdController,
  updateUserEmailController,
  deleteUserController,
} from '../controllers';

const router = Router();

router.post('/signup', validateShape(createUserShape), createUserController);

router.post('/login', validateShape(loginUserShape), loginUserController);

router.get('', paginate(USERS), retrieveUserController);

router.get(
  '/:uuid',
  validateAuth,
  getUser,
  verifyUserPermission,
  retrieveUserByIdController
);

router.put(
  '/:uuid/email',
  validateShape(updateUserEmailShape),
  validateAuth,
  getUser,
  verifyUserPermission,
  updateUserEmailController
);

router.delete(
  '/user/:uuid',
  validateAuth,
  getUser,
  verifyUserPermission,
  deleteUserController
);

export default router;
