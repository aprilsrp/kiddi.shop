import mongoose from 'mongoose'
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.Promise = Promise
mongoose.connect(
  'mongodb+srv://admin:1234@cluster0.i8m2g.mongodb.net/test',
  {
    dbName: 'kiddi',
    // user: DB_USERNAME,
    // pass: DB_PASSWORD,
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)
