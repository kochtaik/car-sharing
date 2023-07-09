const mongoose = require('mongoose');


/**
 * 
 * @param {Array<string>} units 
 * @returns 
 */
function getMeasurementSchema(units, isRequired = false) {
    return new mongoose.Schema({
        required: isRequired,
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