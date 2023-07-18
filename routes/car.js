const express = require('express');
const router = express.Router();
const {
    getCarsInUse,
    getReservedCars,
    addCar,
    updateOldCars,
    updateFrequentlyBookedCars,
    removeCar
} = require('../controllers/cars');

router.get('/in-use', getCarsInUse);
router.get('/reserved', getReservedCars);
router.post('/add', addCar);
router.put('/update-old-cars', updateOldCars);
router.put('/update-frequently-booked/:vin', updateFrequentlyBookedCars);
router.delete('/remove/:vin', removeCar);


module.exports = router;