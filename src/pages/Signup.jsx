import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.username)) {
            setErrors({ email: 'Invalid email format' });
            return;
        }

        try {
            const response = await axiosInstance.post('/registerUser', formData);
            if (response.status === 201) {
                toast.success('Registration successful');
                navigate("/login");
            } else {
                toast.error('Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed');
        }
    };



    return (
        <div className="container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email</label>
                    <input
                        type="email"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`form-control ${errors.email && 'is-invalid'}`}
                        id="username"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-control"
                        id="password"
                        minLength={6}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Register</button>
            </form>
            <p>Already have an account? <button className="btn btn-link" onClick={() => navigate("/")}>Login</button></p>
        </div>
    );

}

export default Signup;
