import express from 'express';
import usersControllers from '../controllers/users.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter
  .get('/', usersControllers.getAllUsers)
  .get('/:id', usersControllers.getUserById)
  .put('/:id', usersControllers.editUser)
  .delete('/:id', usersControllers.deleteUser)
  .post('/register', usersControllers.register)
  .get('/', authMiddleware.verifyToken , usersControllers.getAuth);

export default userRouter;