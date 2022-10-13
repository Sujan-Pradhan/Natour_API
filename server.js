const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down.....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

require('dotenv').config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) =>
    // console.log(con.connections);
    console.log(`DB connection successfull`)
  );
// .catch((err) => {
//   console.log(err);
// });

// console.log(process.env);

// console.log(app.get('env'));

//Server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server listening to port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION 💥 Shutting down.....');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x);
