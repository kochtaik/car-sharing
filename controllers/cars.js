const Car = require('../models/Car');
const { successUpdateResponse, successReadResponse, baseSuccessResponse } = require('../utils/response-factory');
const { CAR_STATUSES } = require('../constants/car');

/**
 * Obtain list of cars that are currently in use
 * and fuel level less than 1/4 of full tank.
 */
async function getCarsInUse(req, res) {
    try {
        const cars = await Car.find({
            status: CAR_STATUSES.IN_USE,
            'fuel_level.value': { $lte: 25 },
        });

        return res.status(200).json(successReadResponse(cars));
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
            status: CAR_STATUSES.RESERVED,
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

        return res.status(200).json(successReadResponse(cars));

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
        return res.status(200).json(baseSuccessResponse);
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
        }, { $set: { status: CAR_STATUSES.IN_SERVICE } });

        return res.status(200).json(successUpdateResponse(response.modifiedCount));
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
}
/**
 * Update any car that has been booked more than 2 times
 * and aren't *In use* or *Reserved* by setting location coordinates
 * to { latitude: 53.8882836, longitude: 27.5442615}
 */
async function updateFrequentlyBookedCars(req, res) {
    try {
        const response = await Car.updateMany(
            {
                $or: [
                    { 'bookings_history.2': { $exists: true } },
                    { status: { $nin: [CAR_STATUSES.IN_USE, CAR_STATUSES.IN_SERVICE] } },
                ]
            },
            {
                $set: { 'location.coordinates': [53.8882836, 27.5442615] },
            },
        );

        return res.status(200).json(successUpdateResponse(response.modifiedCount));
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
}

/**
 * Remove car by VIN
 */
async function removeCar(req, res) {
    try {
        const { vin } = req.params;
        await Car.deleteOne({ vin });

        return res.status(200).json(baseSuccessResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
}

module.exports = {
    getCarsInUse,
    getReservedCars,
    addCar,
    updateOldCars,
    updateFrequentlyBookedCars,
    removeCar,
}