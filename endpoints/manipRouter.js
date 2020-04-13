const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.put('/:id', (req, res) => {
    const carData = req.body;
    const id = req.params.id;

    db('cars-migration').where('id', id).first()
        .update(carData)
        .then(car => {
            if (car) {
                if (carData.vin && carData.make && carData.model && carData.mileage) {
                    res.status(201).json(car);
                } else {
                    res.status(400).json({ message: 'You must include your car\'s Vin, Make, Model, and Mileage.'});
                };
            } else {
                res.status(404).json({ error: `Car ${id} does not exist.`});
            };
        })
        .catch(err => {
            res.status(500).json({ message: `Woops, there was a problem updating car #${id}\'s info.`, err});
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db('cars-migration').where('id', id).del()
        .then(car => {
            if (car) {
                res.status(200).json({ message: 'Car deleted'});
            } else {
                res.status(404).json({ error: `Car ${id} does not exist`});
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error deleting car'});
        });
});

module.exports = router;