const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.post('/', (req, res) => {
    const carData = req.body;

    db('cars-migration').insert(carData)
        .then(post => {
            if (carData.vin && carData.make && carData.model && carData.mileage) {
                res.status(201).json(post);
            } else {
                res.status(400).json({ message: 'You must include your car\'s Vin, Make, Model, and Mileage.'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error adding new car info', err});
        })
});

module.exports = router;