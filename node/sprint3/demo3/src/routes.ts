import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUserProfileController,
  loginUserController,
  updateUserController,
} from './controllers';
import { authToken, findUser, validateToken } from './middlewares';

const userRouter = Router();

userRouter.post('', createUserController);
userRouter.post('/login', findUser, authToken, loginUserController);
userRouter.get('', getUserController);
userRouter.get('/profile', validateToken, getUserProfileController);
userRouter.patch('/:id', updateUserController);
userRouter.delete('/:id', deleteUserController);

export default userRouter;
