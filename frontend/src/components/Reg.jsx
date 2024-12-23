import React, { useState } from 'react';
import './reg.css';
import { NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/Auth';
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

function Reg() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const navigate = useNavigate();

    const {storeTokenInLs} = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value 
        });

        
        if (name === 'username' && value.length < 3) {
            setErrors({...errors, username: 'Username must be at least 3 characters long'});
        } else {
            setErrors({...errors, username: ''});
        }


        if (!user.email) {
                      errors.email = "Email is required";
                      isValid = false;
                  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
                      errors.email = "Invalid email address";
                      isValid = false;
                  }

        if (name === 'password' && value.length < 6) {
            setErrors({...errors, password: 'Password must be at least 6 characters long'});
        } else {
            setErrors({...errors, password: ''});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        
        try{
            const response = await fetch(`http://localhost:5000/api/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })

        if(response.ok){

            const res_data = await response.json();
            storeTokenInLs(res_data.token);
            // localStorage.setItem("token", res_data.token);

            alert("Registration successful")
            setUser({
                username: "",
                email: "",
                phone: "",
                password: ""
            })
            navigate("/")
        }

        else {
            // If status code is 400, display email already exists message
            if (response.status === 400) {
                alert("Email already exists. Please use a different email.");
            } else {
                alert("Registration failed. Please try again later.");
            }}

        }
        catch(error){
            console.log("Reg Error",error);
        }
    };

    return (
        <div>
            <div className="reg">
                <div className="reg-form">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type='text'
                                name='username' 
                                placeholder='Enter your username' 
                                id='username' 
                                required
                                autoComplete='off'
                                value={user.username} 
                                onChange={handleInput}
                                className={errors.username ? 'error' : ''}
                            />
                            {errors.username && <div className="error-message">{errors.username}</div>}

                            <input
                                type='email'
                                name='email' 
                                placeholder='Enter your email' 
                                id='email' 
                                required
                                autoComplete='off'
                                value={user.email} 
                                onChange={handleInput}
                            />

                            <input
                                type='number'
                                name='phone' 
                                placeholder='Enter your phone no' 
                                id='phon' 
                                required
                                autoComplete='off'
                                value={user.phone} 
                                onChange={handleInput}
                            />

                            <div className="pass">

                            <input
                                // type='password'
                                type={showPassword ? 'text' : 'password'}
                                name='password' 
                                placeholder='Enter your password' 
                                id='password' 
                                required
                                autoComplete='off'
                                value={user.password} 
                                onChange={handleInput}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}

                            <span 
                                className="toggle-password" 
                                onClick={togglePasswordVisibility}
                            >
                                
                                {showPassword ? <TbEyeClosed /> : <FaEye />}
                            </span>


                            </div>


                            <button type='submit'>Register Now</button>

                            <div className="login-sec">
                            <p>Already have an account?</p>
                            <NavLink className='loginlink' to="/login">Login</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Reg;
