import express from 'express';
import usersControllers from '../controllers/users.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter
  .post('/register', usersControllers.register)
  .get('/auth', authMiddleware.verifyToken, usersControllers.getAuth)
  .get('/', usersControllers.getAllUsers)
  .get('/:id', usersControllers.getUserById)
  .put('/:id', usersControllers.editUser)
  .delete('/:id', usersControllers.deleteUser);

export default userRouter;