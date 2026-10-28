const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');

const app = express();

// midlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/tours', tourRouter);


app.all('/{*splat}', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `can't find ${req.originalUrl} on this server!`
    // });

    // const err = new Error(`can't find ${req.originalUrl} on this server!`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});


// global error handling middelware
app.use(globalErrorHandler);

module.exports = app;
