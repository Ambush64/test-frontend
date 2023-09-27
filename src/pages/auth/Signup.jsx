import React, { useState } from "react";
import SCLOGO from "../../assets/img/sc-logo.png";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8090',
});


const Signup = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      const response = await axiosInstance.post('/signup', {
        name: name,
        email: email,
        password: password,
        token: ''
      });

      if (response.status === 422) {
        console.log('User is already registered');
      } else if (response.status === 201) {
        console.log('User registered successfully');
        history.push('/auth/signin');
      } else {
        console.log('Unexpected error');
      }

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <React.Fragment>
      <div className="auth-header">
        <div className="auth-header-logo">
          <img src={SCLOGO} alt="" className="auth-header-logo-img" />
        </div>
        <h1 className="auth-header-title">Create Account</h1>
        <p className="auth-header-subtitle">
          Create your account and be part of us
        </p>
      </div>
      <div className="auth-body">
        <form className="auth-form-validation" onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="name" className="input-label">
              Full Name
            </label>
            <input
              type="text"
              className="input-control"
              id="name"
              name="name"
              placeholder="Jhon doe"
              autoComplete="off"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="email" className="input-label">
              Email address
            </label>
            <input
              type="text"
              className="input-control"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              autoComplete="off"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input-control"
              placeholder="Password"
              autoComplete="off"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn-submit">
            Create account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/auth/signin"} className="link-text-center">
            Signin instead
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Signup;
