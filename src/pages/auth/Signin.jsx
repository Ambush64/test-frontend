import React, { useState } from "react";
import SCLOGO from "../../assets/img/sc-logo.png";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";


const axiosInstance = axios.create({
  baseURL: 'https://test-backend-peach.vercel.app',
});

const Signin = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = async (e) => {

    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axiosInstance.post('/signin', {
        email: email,
        password: password,
      });

      if (response.status === 400) {
        console.log('Please fill in all the required fields');
      } else if (response.status === 400) {
        console.log('Invalid Credentials');
      } else if (response.status === 200) {
        console.log('Login successful');
        history.push('/admin/dashboard');
      }
      else {
        console.log('Unexpected error');
      }

      setFormData({
        email: '',
        password: '',
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
        <p className="auth-header-subtitle">
          Sign-in to your account and start the adventure
        </p>
      </div>
      <div className="auth-body">

        <form className="auth-form-validation" onSubmit={handleSubmit}>
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
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn-submit">
            Sign in
          </button>
        </form>
        <p className="text-center">
          New on our platform?{" "}
          <Link to={"/auth/signup"} className="link-text-center">
            Create account here
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Signin;
