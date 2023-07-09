const mongoose = require('mongoose');
const getMeasurementSchema = require('./Measurement');


const BookingHistoryRecord = new mongoose.Schema({
    finish_fuel_level: getMeasurementSchema(["liters", true]),
    finish_milage: getMeasurementSchema(["km", true]),
});

module.exports = BookingHistoryRecord;