import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/register', formData);
            if (response.status === 201) {
                navigate("/")
                toast.success('Registration successful');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="form-control"
                        id="username"
                    />
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
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p>Already have an account? <button className="btn btn-link" onClick={() => navigate("/")}>Login</button></p>
        </div>
    );
}

export default RegistrationForm;
