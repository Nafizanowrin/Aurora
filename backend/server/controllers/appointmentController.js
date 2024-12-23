const Appointment = require('../models/appointmentModel');
const nodemailer = require('nodemailer')

// Handle appointment submission
const bookAppointment = async (req, res) => {
    const { name, email, phone, service, date, time } = req.body;

    try {
        const newAppointment = new Appointment({ name, email, phone, service, date, time });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment.', error });
    }
};

// Get all appointments
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments.', error });
    }
};

// Get appointments by email
const getAppointmentsByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const appointments = await Appointment.find({ email });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments by email.', error });
    }
};


// Get a specific appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointment.', error });
    }
};

const approveAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        //console.log(appointment)
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        // //console.log(appointment);

        // Send an email to notify the user
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.SMTP_EMAIL, // Your email
              pass: process.env.SMTP_PASS, // Your email password or app password
            },
        });

        //console.log(appointment.email)
        const mailOptions = {
            from: 'your-email@example.com', // Replace with your email
            to: appointment.email,
            subject: 'Appointment Approved',
            text: `Dear ${appointment.name},\n\nYour appointment for the service "${appointment.service}" on ${appointment.date.toDateString()} at ${appointment.time} has been approved.\n\nThank you for choosing us.\n\nBest regards,\nAurora`
        };

        // //console.log("tiktak");

        await transporter.sendMail(mailOptions);

        // Approve the appointment
        appointment.isApproved = true;
        await appointment.save();

        //console.log("email gese");

        res.status(200).json({ message: 'Appointment approved successfully!', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error approving appointment.', error });
    }
};



module.exports = {
    bookAppointment,
    getAppointments,
    getAppointmentById,
    approveAppointment,
    getAppointmentsByEmail
};
