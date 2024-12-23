import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import './Discount.css'

const Feedback = () => {
    const { user, isLoggedin } = useAuth(); // Get user from useAuth hook
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Redirect to login if not logged in
        if (!isLoggedin) {
            setShouldRedirect(true);
            return;
          }
      
          if (shouldRedirect) {
            window.location.href = '/login';
            return null;
          }

        const token = localStorage.getItem('token');
        if (!token) return alert("Please log in to submit feedback.");

        try {
            await axios.post(
                'http://localhost:5000/api/feedbacks',
                {
                    email: user?.email || '', // Directly use user email from useAuth
                    content: text,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setText(''); // Reset only the feedback text after submission
            alert('Feedback submitted successfully!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <>
        
      <div className="feedback-section">
        <h3>Share Your Experience with us</h3>
                
      <div className='form'>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className='form-input_wrapper'>
            {/* Email Input */}
            <input
              type="email"
              name="email"
              value={user?.email || ''}
              placeholder="Email"
              className="text-form_input"
              readOnly
              required
            />

            {/* Feedback Textarea */}
            <div className="textarea-wrapper">


              <textarea
                placeholder="Give your feedback..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-form_input"
                required
              />
            </div>

            {/* Notebook Image */}
          
          </div>

          {/* Feedback Buttons */}
          <div className="feed-btns">
            {!isLoggedin ? (
              <button
                className='redirect'
                type="button"
                onClick={() => { window.location.href = '/login'; }}
              >
                Submit
              </button>
            ) : (
              <button className='discount_btn' type='submit'>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
</div>
        </>
    );
};

export default Feedback;