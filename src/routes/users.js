const express = require('express');
const router = express.Router();


const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        }
        else {
            console.log(err);
        }
    });
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            // con arreglo
            //res.json(rows);
            //sin arreglo
            res.json(rows[0]);
        }
        else{
            console.log(err);
        }
    });
});
router.post('/', (req, res) => {
    const {id, nombre, documento, pass, fecha } = req.body;
    const query = 'CALL usuarioAddorEdit2(?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id, nombre, documento, pass, fecha], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Usuario guardado con efectividad.'});
        }
        else {
            console.log(err);
        }
    });
});
router.put('/:id', (req, res) => {
    const {nombre, documento, pass, fecha } = req.body;
    const { id } = req.params;
    const query = 'CALL usuarioAddorEdit2(?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [id, nombre, documento, pass, fecha], (err, rows, fields) => {
        if(!err) {
            res.json({Status: 'Usuario actualizado'});
        }
        else {
            console.log(err);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE ID =?', [id], (err, row, fields) => {
        if(!err){
            res.json({Status: 'Usuario eliminado'});
        }
        else {
            console.log(err);
        }
    });
});

module.exports = router;
