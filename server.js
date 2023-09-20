const mongoose = require('mongoose');

const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' }); // to read env variable from the file and save them into node js env variables

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successfully!');
  });

// console.log(app.get('get')); // check env
// console.log(process.env); // detail env info (these variable they come from the process core module)

// 4) START SERVER

// const port = 3000;
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLE REJECTION 🔥 shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // 0 stand for a success & 1 stand for an caught exception
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCRPTION 🔥 shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
