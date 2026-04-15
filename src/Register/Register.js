import React from 'react'
import { useState } from 'react';
import BottomNav from '../Components/BottomNav/BottomNav';
import "./Register.css";


function Register() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const [user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
        password:""
        });

        const handleRegister = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Registration successful:', data);
                // Redirect to login page or show success message
            } catch (error) {
                console.error('Error during registration:', error);
                // Show error message to user
            }
        
        };
  return (
    <div className='register-container'>
        <div className='register-box'>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='Name' value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})} required/>
                <input type="email" placeholder='Email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} required/>
                <input type="text" placeholder='Phone' value={user.phone} onChange={(e)=>setUser({...user,phone:e.target.value})} required/>
                <input type="password" placeholder='Password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} required/>
                <button type='submit' className='register-btn'>Register</button>
            </form>
        </div>
        <BottomNav />
    </div>
  )
}

export default Register