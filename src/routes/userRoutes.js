import express from 'express';
import usersControllers from '../controllers/users.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter
  .post('/register', usersControllers.register)
  .post('/contact', usersControllers.contact)
  .put('/:id', usersControllers.editUser)
  .get('/auth', authMiddleware.verifyToken, usersControllers.getAuth)
  .get('/', usersControllers.getAllUsers)
  .get('/:id', usersControllers.getUserById)
  .delete('/:id', usersControllers.deleteUser);

export default userRouter;