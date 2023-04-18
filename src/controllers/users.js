import User from '../models/userModel.js';
// import * as admin from 'firebase-admin';
import { authFirebaseApp } from '../firebase/index.js';

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    return res.status(200).json({
      message: 'All Users successfully shown',
      data: allUsers,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    if (req.params.id) {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'User found',
        data: user,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Invalid params',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

// const createUser = async (req, res) => {
//   try {
//     const oneUser = req.body;
//     const newUser = await User.create(oneUser);
//     return res.status(201).json({
//       message: 'User created',
//       data: newUser,
//       error: false,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//       data: undefined,
//       error: true,
//     });
//   }
// };

const editUser = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        message: 'Missing Parameter',
        data: undefined,
        error: true,
      });
    }

    const result = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'User not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'User updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        message: 'Missing parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'User not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.json(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};



const getAuth = async (req, res) => {
  try {
    const user = await getAuth().getUser(req.headers.firebaseUid);
    if (user) {
      return res.status(201).json({
        message: 'User found',
        data: user.toJSON(),
        error: false,
      });
    }

    return res.status(404).json({
      message: 'User not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const register = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await authFirebaseApp.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    const newUser = await User.create({
      firebaseUid: newFirebaseUser.uid,
      name: req.body.name,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });
    return res.status(201).json({
      message: 'User has been created',
      data: newUser,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await authFirebaseApp.deleteUser(firebaseUid);
    }
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};


export default {
  getAllUsers,
  getUserById,
  // createUser,
  editUser,
  deleteUser,
  getAuth,
  register
};
