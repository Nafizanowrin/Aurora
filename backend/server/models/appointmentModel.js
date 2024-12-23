const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    service: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    isApproved: {
        type: Boolean,
        default: false // New appointments are not approved by default
    },
    isPaid: {
        type: Boolean,
        default: false // Default to unpaid
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
