const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello from the server side!');
//   res.status(200).json({
//     message: 'Hello from the server side!',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endppoint...');
// });

// 1) MIDDLEWARE

console.log('Console', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // can use 'tiny'
}

app.use(express.json()); // use the middleware

app.use(express.static(`${__dirname}/public`)); // give static folder access

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  // console.log('App Header', req.headers);

  next();
});

// 2) ROUTE HANDLERS

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id/:x/:y?', (req, res) => { //y is optional parameter

// console.log(req.params); //{ id: '5', x: '23', y: '50' }

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES

// app.route('/api/v1/tours').get(getAllTours).post(createTour);

// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

// this is call Mounting a new router on a route

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Cant find ${req.originalUrl} on this server!`,
  // });

  // this is a create new Error
  // const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);

  // this is create a new Error Class & new object
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

// Central Error Hanlding Middleware

app.use(globalErrorHandler);

module.exports = app;
