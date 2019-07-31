const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParse = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const server = http.createServer(app);

// Import MongoDB Connect Modules
const conn = require('./libs/mongodb');

// Import Routes
const meteorRoutes = require('./routes/meteorRoutes');
const dcardRoutes = require('./routes/dcardRoutes');
const pttRoutes = require('./routes/pttRoutes');

// Import Crawler Modules
const meteor = require('./crawler/meteor');
const dcard = require('./crawler/dcard');
const ptt = require('./crawler/ptt');

const handler = require('./libs/handler');

const { PORT } = process.env;

// Loading Config
require('dotenv').config();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({
  extended: false,
}));

// Connect MongoDB
(async () => {
  await conn.connect();
})();

app.use('/meteor', meteorRoutes);
app.use('/dcard', dcardRoutes);
app.use('/ptt', pttRoutes);
app.use('*', (req, res, next) => next(new handler.NoFound('Not found')));

app.use((error, req, res, next) => {
  res.status(error.code);
  res.json({
    name: error.name,
    code: error.code,
    error: error.message,
    message: error.detailMessage,
  });
});

setInterval(() => {
  meteor.getMeteorsellphoto();
  dcard.getDressup();
  ptt.getBeauty();
}, 1800000);

server.listen(PORT || 3000, () => console.log(`
  Server is ruuning in ${PORT} PORT.`));
