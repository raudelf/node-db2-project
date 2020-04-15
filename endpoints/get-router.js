const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars-migration')
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving cars.'});
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db('cars-migration').where('id', id).first()
        .then(car => {
            if (car) {
                res.status(200).json(car);
            } else {
                res.status(404).json({ error: `Car ${id} does not exist.`});
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Oh, oh, there was a problem retrieving car ${id}`})
        })
})

module.exports = router;