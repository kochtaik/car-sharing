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

/**
 * Obtain all cars that have been reserved,
 * but driver credit/debit card hasn't been authorized.
 */
async function getReservedCars(req, res) {
    try {
        const curDate = new Date();
        const cars = await Car.find({
            status: 'reserved',
            'driver.credit_card.valid_through': {
                $lt: curDate,
            },
        }, {
            vin: true,
            location: true,
            driver: {
                first_name: true,
                last_name: true,
                license_number: true,
            },
        });

        return res.status(200).json({ success: true, nbHits: cars.length, cars })

    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false }); 
    }
}

/**
 * Add new car in the car sharing park.
 */
async function addCar(req, res) {
    try {
        await Car.create(req.body);
        res.status(200).json({ success: true });
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false });
    } 
}

/**
 * Update any car produced before '01/01/2017' or
 * has mileage greater than 100000 km by setting Status to *In Service*
 */
async function updateOldCars(req, res) {
    try {
        const response = await Car.updateMany({
            $or: [
                { 'production_info.date': { $lt: new Date(2017, 0, 1) } },
                { 'mileage.value': { $gt: 100000 } },
            ],
        }, { $set: { status: 'in-service' } });
        res.status(200).json({ success: true, nbHits: response.modifiedCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
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