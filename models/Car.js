const mongoose = require("mongoose");
const LocationSchema = require('./Location');
const BookingHistoryRecord = require('./BookingHistoryRecord');
const getMeasurementSchema = require('./Measurement');
const { CAR_STATUSES } = require('../constants/car');

const CarSchema = new mongoose.Schema({
    vin: {
        type: String,
        required: true,
    },
    registration_number: {
        type: String,
        required: true,
    },
    production_info: {
        brand: String,
        model: String,
        date: Date,
    },
    status: {
        type: String,
        enum: Object.values(CAR_STATUSES),
        required: true,
    },
    fuel_level: getMeasurementSchema(["liter", "percent"]),
    mileage: getMeasurementSchema(["km"]),
    current_run: getMeasurementSchema(["km"]),
    start_date: {
        type: Date,
        required: true,
    },
    driver: {
        license_number: {
            type: String,
            required: true,
        },
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
        },
        credit_card: {
            number: {
                type: Number,
                required: true,
            },
            owner: {
                type: String,
                required: true,
                trim: true,
                validate: {
                    validator: function (value) {
                        const regex = /^[a-zA-Z-]+ [a-zA-Z-]+$/;
                        return regex.test(value);
                    },
                    message: 'Invalid cardholder name. Please provide both first name and last name.',
                },
            },
            valid_through: {
                type: Date,
                required: true,
            }
        },
    },
    start_fuel_level: getMeasurementSchema(["liters"]),
    start_milage: getMeasurementSchema(["km"]),
    location: LocationSchema,
    bookings_history: {
        type: [BookingHistoryRecord],
        required: true,
    }
});

module.exports = mongoose.model('Car', CarSchema);