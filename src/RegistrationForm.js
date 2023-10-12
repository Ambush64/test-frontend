import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleProvider } from './firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


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
            const userCredential = await createUserWithEmailAndPassword(auth, formData.username, formData.password);
            if (userCredential) {
                toast.success('Registration successful');
                navigate("/")
            } else {
                toast.warning('Registration unsuccessful');

            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success('Registration successful');
            navigate("/")
        } catch (err) {
            console.error(err);
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
                        minLength={6}
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2">Register</button>
            </form>
            <button className="btn btn-danger" onClick={signInWithGoogle}>
                Sign up with Google
            </button>
            <p>Already have an account? <button className="btn btn-link" onClick={() => navigate("/")}>Login</button></p>
        </div>
    );
}

export default RegistrationForm;
