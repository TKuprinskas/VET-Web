const express = require('express');

const router = express.Router();
const mysql = require('mysql2/promise');
const Joi = require('joi');
const logger = require('../../logger');
require('dotenv').config();
const { dbConfig } = require('../../config');

const petSchema = Joi.object({
  medication_id: Joi.string().alphanum().trim().required(),
  pet_id: Joi.string().alphanum().trim().required(),
  comment: Joi.string().trim().required(),
});

// GET - gets merged data from medications and prescriptions
router.get('/:id?', async (req, res) => {
  const { id = '' } = req.params;
  try {
    const query = `SELECT prescriptions.id, prescriptions.comment, prescriptions.tstamp, pets.id, pets.pet_name, pets.dob, 
    pets.client_email, medications.medication_name, medications.description 
    FROM prescriptions 
    LEFT JOIN pets ON pets.id = prescriptions.pet_id
    LEFT JOIN medications ON medications.id = prescriptions.medication_id
    ${id && `WHERE pets.id = ${mysql.escape(id)}`} `;
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(500).send({ msg: 'Please try again.' });
  }
});

// POST - post new prescription
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
      `INSERT INTO prescriptions (medication_id, pet_id, comment)
            VALUES (${mysql.escape(userInput.medication_id)}, ${mysql.escape(userInput.pet_id)}, ${mysql.escape(userInput.comment)})`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;
