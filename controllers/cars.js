const Car = require('../models/Car');


/**
 * Obtain list of cars that are currently in use
 * and fuel level less than 1/4 of full tank.
 */
async function getCarsInUse(req, res) {
    try {
        const car = await Car.find({
            status: 'in-use',
            'fuel_level.value': { $lte: 25 },
        });

        return res.status(200).json({
            success: true,
            data: car,
            nbHits: car.length,
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
    
}

function getReservedCars(req, res) {

}

function addCar(req, res) {

}

function updateOldCars(req, res) {

}

function updateFrequentlyBookedCars(req, res) {

}

function removeCar(req, res) {

}

module.exports = {
    getCarsInUse,
    getReservedCars,
    addCar,
    updateOldCars,
    updateFrequentlyBookedCars,
    removeCar,
}