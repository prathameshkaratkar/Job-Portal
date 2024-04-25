import express from 'express';
import mongoose from 'mongoose';

import router from './admin/admin.routes.js';

const port = process.env.PORT || 3003;

const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/JobPortal")
 .then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log("Failed to connect to MongoDB");
  })

app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to the Codesphere');
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});