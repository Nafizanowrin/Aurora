const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Appointment = require('../models/appointmentModel');
const Product = require('../models/product')
const mongoose = require('mongoose');

const initiatePayment = async (req, res) => {
    const { amount, customerName, customerEmail } = req.body;
    const { id } = req.params;
    const tranId = uuidv4(); // Generate unique transaction ID
    //console.log(id)

    // Prepare request body
    const requestBody = {
        store_id: "aamarpaytest",
        tran_id: tranId,
        success_url: `http://localhost:5000/api/pay/confirm-payment/${id}`,
        fail_url: "http://localhost:5000/api/pay/failed-payment",
        cancel_url: "http://localhost:5000/api/pay/failed-payment",
        amount: amount*125,
        currency: "BDT",
        signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
        desc: "Merchant Registration Payment",
        cus_name: customerName,
        cus_email: customerEmail,
        cus_add1: "House B-158 Road 22",
        cus_add2: "Mohakhali DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: "+8801704",
        type: "json"
    };

    try {
        // Send POST request to Aamarpay sandbox API
        const response = await axios.post('https://sandbox.aamarpay.com/jsonpost.php', requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Return Aamarpay's response
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to initiate payment", details: error.message });
    }
};

const confirm  = async (req, res) => {
    const { id } = req.params;
    console.log("coming...",id)
    try {
        // Update isPaid field in the Appointment model
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { _id : id }, // Match by transaction ID
            { isPaid: true }, // Update to mark as paid
            { new: true } // Return the updated document
        );

        if (!updatedAppointment) {
            return res.status(404).send("Appointment not found for the given transaction ID");
        }

        console.log(updatedAppointment)

        // Redirect to the profile page
        res.redirect('http://localhost:5173/profile');
    } catch (error) {
        res.status(500).json({ error: "Failed to update payment status", details: error.message });
    }
};

const failed = async (req,res) =>{
    // Redirect to the profile page
    res.redirect('http://localhost:5173/profile');
}

const initiatePaymentProduct = async (req, res) => {
    const { amount, cartItems } = req.body;
    const { id } = req.params;
    const tranId = uuidv4(); // Generate unique transaction ID
    //console.log(id)

    const response = await axios.put('http://localhost:5000/api/product', cartItems, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data)

    // Prepare request body
    const requestBody = {
        store_id: "aamarpaytest",
        tran_id: tranId,
        success_url: `http://localhost:5000/api/pay/confirm-payment-product/${id}`,
        fail_url: "http://localhost:5000/api/pay/failed-payment",
        cancel_url: "http://localhost:5000/api/pay/failed-payment",
        amount: amount*125,
        currency: "BDT",
        signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
        desc: "Merchant Registration Payment",
        cus_name: "Dont know",
        cus_email: "customerEmail@email.com",
        cus_add1: "House B-158 Road 22",
        cus_add2: "Mohakhali DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: "+8801704",
        type: "json"
    };

    try {
        // Send POST request to Aamarpay sandbox API
        const response = await axios.post('https://sandbox.aamarpay.com/jsonpost.php', requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Return Aamarpay's response
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to initiate payment", details: error.message });
    }
};

const confirmProduct = async (req, res) => {
    try {
        // Capture the array of IDs from the URL parameters
        const ids = req.params.id.split(","); // IDs passed as a comma-separated string (e.g., "1,2,3")
        console.log("IDS are ", ids);

        // Convert string IDs to ObjectId (ensure proper conversion)
        //const objectIds = ids.map(id => mongoose.Types.ObjectId(id));
        //console.log(objectIds)
        const updatedProducts = await Product.updateMany(
        { _id: { $in: ids } }, // Ensure each id is an ObjectId
        { 
            $set: {
            success: true,
            status: "Order Received"
            }
        }
        );

        console.log("Updated Products:", updatedProducts); // Log the update result

        // Redirect to the profile page
        res.redirect('http://localhost:5173/products');
    } catch (error) {
      res.status(500).json({ message: "Failed to confirm products", error });
    }
};

module.exports = {
    initiatePayment, confirm, failed, confirmProduct, initiatePaymentProduct
};