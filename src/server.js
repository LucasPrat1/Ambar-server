import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes/index.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// Permitir acceso desde la URL de la aplicación cliente (reemplaza con tu URL real)
const allowedOrigins = ['https://ambar-app.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true  }));

app.get('/api', async (req, res) => {
  res.send('Hello world');
});

app.use('/api', router)

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to DB successfully');
  app.listen(port, () => {
    console.log(`server listen at PORT ${port}`);
  });
})
  .catch((error) => {
    console.log(error.message);
});
