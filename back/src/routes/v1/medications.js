const express = require('express');

const router = express.Router();
const mysql = require('mysql2/promise');
const Joi = require('joi');
const logger = require('../../logger');
require('dotenv').config();
const { dbConfig } = require('../../config');

const petSchema = Joi.object({
  medication_name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
});

// GET - get all medications
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM medications';
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(500).send({ msg: 'Please try again.' });
  }
});

// POST - post new medication
router.post('/', async (req, res) => {
  let userInput = req.body;
  try {
    userInput = await petSchema.validateAsync(userInput);
  } catch (err) {
    logger.error(err);
    return res.status(400).send({ err: 'Incorrect data passed' });
  }
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `INSERT INTO medications (medication_name, description)
            VALUES (${mysql.escape(userInput.medication_name)}, ${mysql.escape(userInput.description)})`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;
