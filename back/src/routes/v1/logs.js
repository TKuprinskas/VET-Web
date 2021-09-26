const express = require('express');

const router = express.Router();
const mysql = require('mysql2/promise');
const Joi = require('joi');
const logger = require('../../logger');
require('dotenv').config();
const { dbConfig } = require('../../config');

const petSchema = Joi.object({
  pet_id: Joi.string().alphanum().trim().required(),
  description: Joi.string().trim().required(),
  status: Joi.string().trim().required(),
});

// GET - gets log from two merged tables and can be found by id
router.get('/:id?', async (req, res) => {
  const { id = '' } = req.params;
  try {
    const query = `
    SELECT logs.pet_id, logs.description, logs.status, pets.pet_name, pets.dob, pets.client_email, pets.archived
    FROM logs LEFT JOIN pets ON logs.pet_id = pets.id
    ${id && `WHERE pet_id = ${mysql.escape(id)}`} `;
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(500).send({ msg: 'Please try again.' });
  }
});

// POST - post new log
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
      `INSERT INTO logs (pet_id, description, status)
          VALUES (${mysql.escape(userInput.pet_id)}, ${mysql.escape(userInput.description)}, ${mysql.escape(userInput.status)})`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;
