import { authFirebaseApp } from '../firebase/index.js';

const verifyToken = async (req, res, next) => {
  // const { token } = req.headers.token;
  if (!req.headers.token) {
    return res.status(400).json({
      message: 'Provide a Token',
      data: undefined,
      error: true,
    });
  }
  try {
    const decodedToken = await authFirebaseApp.verifyIdToken(req.headers.token);
    req.headers.firebaseUid = decodedToken.uid;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default { verifyToken };