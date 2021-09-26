const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { port } = require('./config');
const pets = require('./routes/v1/pets');
const logs = require('./routes/v1/logs');
const medications = require('./routes/v1/medications');
const prescriptions = require('./routes/v1/prescriptions');
const stats = require('./routes/v1/stats');
const logger = require('./logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/v1/pets', pets);
app.use('/v1/logs', logs);
app.use('/v1/medications', medications);
app.use('/v1/prescriptions', prescriptions);
app.use('/v1/stats', stats);

// GET - check server is running
app.get('/', (req, res) => {
  res.send({ msg: 'Server is running successfully' });
});

// GET - all other routes
app.all('*', (req, res) => {
  logger.warn(`Page not found: ${req.url}`);
  res.status(404).send({ msg: 'Page Not Found' });
});

app.listen(port, () => logger.info(`Server is running on port ${port}`));
