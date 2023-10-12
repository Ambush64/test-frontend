import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleProvider } from './firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function LoginForm() {
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
            // const response = await axios.post('http://localhost:8000/login', formData);

            // if (response.status === 200) {
            //     const token = response.data.token;
            // localStorage.setItem('token', token);
            //     navigate('/product-gallery');
            // }

            const userCredential = await signInWithEmailAndPassword(auth, formData.username, formData.password);
            if (userCredential) {
                localStorage.setItem('token', userCredential.user.accessToken);
                navigate("/customers")
            } else {
                toast.warning('Invalid credentials');

            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Invalid credentials');
            } else {
                console.error('Login failed:', error);
            }
        }
    };

    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            localStorage.setItem('token', userCredential.user.accessToken);
            navigate("/customers")
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="container">
            <h2>Login</h2>
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
                <button type="submit" className="btn btn-primary mb-2">Login</button>
            </form>
            <button className="btn btn-danger" onClick={signInWithGoogle}>
                Sign In with Google
            </button>
            <p>Don't have an account? <button className="btn btn-link" onClick={() => navigate("/register")}>Register</button></p>
        </div>
    );
}

export default LoginForm;
