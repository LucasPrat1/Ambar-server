import express from 'express'
import cors from 'cors';
// import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes/index.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
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
