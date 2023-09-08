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
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
