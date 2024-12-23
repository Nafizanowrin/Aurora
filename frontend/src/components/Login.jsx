import React, { useState } from 'react';
import './login.css';
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/Auth';

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const {storeTokenInLs} = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch(`http://localhost:5000/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            })

            if(response.ok){

                const res_data = await response.json();
                storeTokenInLs(res_data.token);
                localStorage.setItem("user", JSON.stringify(user)); // Store user as a string
                localStorage.setItem("email",user.email)
            
            // localStorage.setItem("token", res_data.token);

                alert("Login successful")
                setUser({                 
                    email: "",
                    password: ""
                })
                navigate("/")
            }
            else{
                alert("Login failed!");
            }
        }
        catch(error){
            console.log("Login Error", error);
        }
        console.log(user);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="login">
                <div className="login-form">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
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
                            <div className="password">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password' 
                                placeholder='Enter your password' 
                                id='password' 
                                required
                                autoComplete='off'
                                value={user.password} 
                                onChange={handleInput}
                            />
                            <span 
                                className="toggle-password" 
                                onClick={togglePasswordVisibility}
                            >
                                {/* {showPassword ? 'Hide' : 'Show'} */}
                                {showPassword ? <TbEyeClosed size={20}/> : <FaEye size={20}/>}
                            </span>
                            </div>
                            <button type='submit'>Login</button>

                            <div className="signup-sec">
                            <p>Don't have an account?  <NavLink className='reglink' to="/registration">Signup</NavLink></p>
                           
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
