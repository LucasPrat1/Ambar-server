import express from 'express'
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected to DB successfully ');
})
  .catch((error) => {
    console.log(error.message);
  });

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listen at PORT ${port}`);
});
