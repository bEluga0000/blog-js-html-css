const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const blogrouter = require('./routes/Blogs');
const userRouter = require('./routes/auth');

const app = express();
const port = 3000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/blog', blogrouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});

const mongooseDBURL = "mongodb+srv://shreyas302005:Nothing69@cluster0.jkaesew.mongodb.net/";

if (!mongooseDBURL) {
  console.log('please add the mongoose url in your .env file');
} else {
  mongoose.connect(mongooseDBURL, { dbName: "Blog" }).then(() => console.log('Connected!'));
}
