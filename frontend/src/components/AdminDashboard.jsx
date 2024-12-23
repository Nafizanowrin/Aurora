import React, { useState, useEffect } from 'react'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([])
  const [products, setProducts] = useState([]) // State to store products
  const [showNotApproved, setShowNotApproved] = useState(false)

  useEffect(() => {
    fetchAppointments()
    fetchProducts() // Fetch products on initial render
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointment')
      if (!response.ok) {
        throw new Error('Failed to fetch appointments')
      }
      const data = await response.json()
      setAppointments(data.reverse())
    } catch (error) {
      console.error('Error fetching appointments:', error)
      alert("Failed to fetch appointments. Please try again.")
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/product') // Assuming an API for products
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data.reverse()) // Set products state
    } catch (error) {
      console.error('Error fetching products:', error)
      alert("Failed to fetch products. Please try again.")
    }
  }

  const approveAppointment = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to approve this appointment?");
    if (!isConfirmed) {
      return; // If not confirmed, exit the function
    }
    try {
      const response = await fetch(`http://localhost:5000/api/appointment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isApproved: true }),
      })
      if (!response.ok) {
        throw new Error('Failed to approve appointment')
      }
      await fetchAppointments() // Refresh the appointments list
      alert("Appointment approved successfully.")
    } catch (error) {
      console.error('Error approving appointment:', error)
      alert("Failed to approve appointment. Please try again.")
    }
  }

  const approvedAppointments = appointments.filter(app => app.isApproved === true)
  const notApprovedAppointments = appointments.filter(app => app.isApproved === false || app.isApproved === null)

  return (
    <div className="container">
      <h1>Aurora Salon Admin Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Appointments Section */}
        <div className="card">
          <div className="card-header">
            <h2>Approved Appointments ({approvedAppointments.length})</h2>
          </div>
          <div className="card-content">
            <AppointmentTable appointments={approvedAppointments} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Not Approved Appointments ({notApprovedAppointments.length})</h2>
          </div>
          <div className="card-content">
            <button onClick={() => setShowNotApproved(!showNotApproved)} className="toggle-button">
              {showNotApproved ? 'Hide' : 'Show'} Not Approved
            </button>
            {showNotApproved && (
              <AppointmentTable 
                appointments={notApprovedAppointments} 
                showApproveButton={true}
                onApprove={approveAppointment}
              />
            )}
          </div>
        </div>

        
      </div>
      {/* Products Section */}
      <div className="card">
          <div className="card-header">
            <h2>Products</h2>
          </div>
          <div className="card-content">
            <ProductTable products={products} />
          </div>
      </div>
    </div>
  )
}

function AppointmentTable({ appointments, showApproveButton = false, onApprove }) {
  return (
    <table className="appointment-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Service</th>
          <th>Date</th>
          <th>Time</th>
          <th>Paid</th>
          {showApproveButton && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment._id}>
            <td>{appointment.name}</td>
            <td>{appointment.service}</td>
            <td>{new Date(appointment.date).toLocaleDateString()}</td>
            <td>{appointment.time}</td>
            <td>{appointment.isPaid ? 'Yes' : 'No'}</td>
            {showApproveButton && (
              <td>
                <button onClick={() => onApprove && onApprove(appointment._id)} className="approve-button">
                  Approve
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ProductTable({ products }) {
  const handleOrderDelivered = async (product) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/id/${product._id}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
  
      const data = await response.json();
      console.log(`Order delivered for product:`, data);
  
      // Show success alert
      alert('Order updated successfully');
  
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order. Please try again.');
    }
  };
  
  

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Order Delivered</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.email}</td>
            <td>{product.amount}</td> {/* Displaying the amount */}
            <td>${product.price}</td>
            <td>
              {product.status === "Order Received" ? (
                <button
                  onClick={() => handleOrderDelivered(product)}
                  className="order-delivered-button"
                >
                  Is Delivered?
                </button>
              ) : (
                product.status
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
