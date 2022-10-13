const express = require('express');
const morgan = require('morgan');
const errorController = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const appError = require('./utils/appError');

const app = express(); //variable

//middleware must be before route handler

//morgan for logging
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public/`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 🙌');
//   next(); //Next if not called then res and req cycle get stucked
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// app.get('/', (req, res) => {
//   console.log('Welcome to Node JS');
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTours);

// app.post('/api/v1/tours', createTours);

// app.patch('/api/v1/tours/:id', patchTours);

// app.delete('/api/v1/tours/:id', deleteTours);

//Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: `Cannot find ${req.originalUrl} on this server!!`,
  //   });

  //////////////////////////////
  //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //   err.status = 'Fail';
  //   error.statusCode = 404;
  //   next(err);

  next(new appError(`Can't find ${req.originalUrl} on this server`), 404);
});

// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

app.use(errorController);

module.exports = app;
