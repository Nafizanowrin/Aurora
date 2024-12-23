import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookings.css'; // Include CSS for styling
import { useAuth } from "../store/Auth";

const services = [
    { name: "Deep Tissue", amount: 48.00 },
    { name: "Body Scrub", amount: 18.00 },
    { name: "Foot Massage", amount: 18.00 },
    { name: "Scalp Treatments", amount: 15.00 },
    { name: "Hair Cut", amount: 25.00 },
    { name: "Hair Color", amount: 50.00 },
    { name: "Fertility Massage", amount: 18.00 },
    { name: "Blemish Buster", amount: 40.00 },
    { name: "Oxygen Facial", amount: 32.00 },
    { name: "Lash Lift", amount: 25.00 },
    { name: "Manicure", amount: 20.00 },
    { name: "Pedicure", amount: 25.00 },
    { name: "Facial", amount: 40.00 },
    { name: "Makeup Makeover", amount: 60.00 },
    { name: "Hair Styling Package", amount: "$80.00" },
    { name: "Luxury Anti-Aging Facial", amount: "$180.00" },
    { name: "Body Scrub & Wrap", amount: "$100.00" },
    { name: "Hair Color & Highlights", amount: "$120.00" },
    { name: "Women’s Grooming Package", amount: "$90.00" },
    { name: "Luxury Pedicure & Manicure", amount: "$70.00" },
    { name: "Acne Treatment Facial",amount: "$90.00" },
    { name: "Herbal Facial Detox", amount: "$70.00" },
    { name: "Hot Stone Massage", amount: "$110.00" },
    { name: "Teen Acne Facial", amount: "$60.00" },
    { name: "Classic Manicure & Pedicure", amount: "$50.00" },
    { name: "Gel Nail Art", amount: "$40.00" },
    { name: "Brow & Lash Tint", amount: "$45.00" },
    { name: "Bridal Package", amount: "$300.00" },
    { name: "Party Makeover", amount: "$150.00" },
    { name: "Facial Combo", amount: "$80.00" },
    { name: "Spa Day Package",  amount: "$120.00" }

];

const Bookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Please log in to view your bookings.');
                    setLoading(false);
                    return;
                }
                console.log(loggedInUser)
                const response = await axios.get(`http://localhost:5000/api/appointment/email/${loggedInUser.email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBookings(response.data.reverse());
                setLoading(false);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Failed to fetch bookings. Please try again later.');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handlePayment = async (booking) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please log in to make a payment.');
                return;
            }

            // Find the service in the services array
            const service = services.find(s => s.name === booking.service);
            if (!service) {
                alert('Service not found.');
                return;
            }

            const response = await axios.post(
                `http://localhost:5000/api/pay/initiate/${booking._id}`,
                {
                    amount: service.amount,
                    customerName: booking.name,
                    customerEmail: booking.email
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Check if the response is successful
            if (response.status === 200 && response.data.result === "true") {
                const paymentUrl = response.data.payment_url;

                // Redirect the user to the payment URL
                window.location.href = paymentUrl;
            } else {
                alert('Failed to initiate payment. Please try again later.');
            }

        } catch (err) {
            console.error('Error processing payment:', err);
            alert('Payment failed. Please try again later.');
        }
    };

    if (loading) {
        return <div className="bookings-loading">Loading bookings...</div>;
    }

    if (error) {
        return <div className="bookings-error">{error}</div>;
    }

    return (
        <div className="bookings-section">
            <h3>Your Appointments in Aurora</h3>
            {bookings.length === 0 ? (
                <div className="bookings-empty">No bookings found.</div>
            ) : (
                <table className="bookings-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td data-label="Name">{booking.name}</td>
                                <td data-label="Email">{booking.email}</td>
                                <td data-label="Phone">{booking.phone}</td>
                                <td data-label="Service">{booking.service}</td>
                                <td data-label="Date">{new Date(booking.date).toLocaleDateString()}</td>
                                <td data-label="Time">{booking.time}</td>
                                <td data-label="Status">
                                    {booking.isPaid ? (
                                        <span className="paid-status">Paid</span>
                                    ) : booking.isApproved ? (
                                        <button
                                            className="pay-now-button"
                                            onClick={() => handlePayment(booking)}
                                        >
                                            Pay Now
                                        </button>
                                    ) : (
                                        <span className="pending-status">Pending</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Bookings;
