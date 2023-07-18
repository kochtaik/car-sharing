const mongoose = require('mongoose');


/**
 * 
 * @param {Array<string>} units 
 * @returns 
 */
function getMeasurementSchema(units,) {
    return new mongoose.Schema({
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
            enum: units,
        }
    });
}


module.exports = getMeasurementSchema;