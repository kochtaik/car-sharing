const mongoose = require("mongoose");
const LocationSchema = require('./Location');
const BookingHistoryRecord = require('./BookingHistoryRecord');
const getMeasurementSchema = require('./Measurement');

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
    status: ["free", "reserved", "in-use", "unavailable", "in-service"],
    fuel_level: getMeasurementSchema(["liter", "percent"]),
    mileage: getMeasurementSchema(["km"]),
    current_run: getMeasurementSchema(["km"]),
    start_date: {
        type: Date,
        required: true,
    },
    driver: {
        required: true,
        license_number: {
            type: String,
            required: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        credit_card: {
            required: true,
            number: {
                type: Number,
                required: true,
            },
            owner: {
                type: String,
                required: true,
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
        start_fuel_level: getMeasurementSchema(["liters"]),
        start_milage: getMeasurementSchema(["km"]),
        location: LocationSchema,
        bookings_history: {
            type: [BookingHistoryRecord],
            required: true,
        }
    }
});

module.exports = mongoose.Model('Car', CarSchema);