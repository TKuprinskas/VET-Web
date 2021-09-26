const express = require('express');

const router = express.Router();
const mysql = require('mysql2/promise');
const Joi = require('joi');
const logger = require('../../logger');
require('dotenv').config();
const { dbConfig } = require('../../config');

const petSchema = Joi.object({
  pet_name: Joi.string().alphanum().trim().required(),
  dob: Joi.date().greater('2000-01-01').less('now').required(),
  client_email: Joi.string().trim().lowercase().required(),
});

// GET - gets all pets which are not archived
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM pets WHERE archived = 0';
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(500).send({ msg: 'Please try again.' });
  }
});

// GET - gets all pets which are not archived
router.get('/pets/:id?', async (req, res) => {
  const { id = '' } = req.params;
  try {
    const query = `SELECT pet_name, dob, client_email, archived FROM pets ${id && `WHERE pets.id = ${mysql.escape(id)} && archived = 0`}`;
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(500).send({ msg: 'Please try again.' });
  }
});

// POST - posts a new pet
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
      `INSERT INTO pets (pet_name, dob, client_email)
            VALUES (${mysql.escape(userInput.pet_name)}, ${mysql.escape(userInput.dob)}, ${mysql.escape(userInput.client_email)})`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// DELETE - changes pet to archived
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(500).send({ msg: 'Incorrect request' });
  }
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`UPDATE pets SET archived = 1 WHERE id=${mysql.escape(id)} `);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(500).send({ msg: 'Please try again' });
  }
});

// EDIT
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
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
      `UPDATE pets SET pet_name = ${mysql.escape(userInput.pet_name)}, dob = ${mysql.escape(userInput.dob)}, client_email = ${mysql.escape(
        userInput.client_email,
      )} WHERE id = ${mysql.escape(id)}`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;
