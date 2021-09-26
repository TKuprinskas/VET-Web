const express = require('express');

const router = express.Router();
const mysql = require('mysql2/promise');
require('dotenv').config();
const { dbConfig } = require('../../config');

// GET - get logs and prescriptions count per animal
router.get('/', async (req, res) => {
  try {
    const query = `
    SELECT p.id, p.pet_name, l.TotalLogs, pr.TotalPrescriptions
    FROM pets p
    LEFT JOIN (SELECT pet_id, count(pet_id) as TotalLogs FROM logs GROUP BY pet_id) l ON l.pet_id = p.id
    LEFT JOIN (SELECT pet_id, count(*) as TotalPrescriptions FROM prescriptions GROUP BY pet_id) pr ON pr.pet_id = p.id `;
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(500).send({ msg: 'Please try again.' });
  }
});

// GET - get total number of animals, total number of logs, prescriptions
router.get('/total', async (req, res) => {
  try {
    const query = `
    SELECT COUNT(pets.id) as TotalAnimals, COUNT(distinct pets.client_email) AS TotalClients, COUNT(distinct logs.id) as TotalLogs, COUNT(distinct prescriptions.pet_id) AS TotalPrescriptions 
    FROM pets 
    LEFT JOIN logs ON logs.pet_id = pets.id
    LEFT JOIN prescriptions ON prescriptions.pet_id = pets.id`;
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(query);
    await con.end();
    return res.send(data);
  } catch (e) {
    return res.status(500).send({ msg: 'Please try again.' });
  }
});

module.exports = router;
