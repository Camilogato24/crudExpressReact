const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT hobbies.nombre, hobbies.descripcion, usuarios.nombre FROM usuarios, hobbies WHERE usuarios.id=hobbies.id', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        }
        else {
            console.log(err);
        }
    });
})

module.exports = router;
