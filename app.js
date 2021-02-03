const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveIndex = require('serve-index');

const indexRouter = require('./routes/index');
const authMiddleware = require('./auth/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Auth
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(authMiddleware);
app.use('/', indexRouter);

// Static content
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.join(__dirname, 'files-uploaded')));
app.use('/files', serveIndex(path.join(__dirname, 'files-uploaded')));

module.exports = app;
