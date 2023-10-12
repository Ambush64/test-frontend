import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Customers from './Customers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Accounts from './Accounts';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [])

  return (

    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/account-transaction" element={<Accounts />} />
        {/* Add a default route or a 404 page */}
        <Route element={() => <div>Page Not Found</div>} />
      </Routes>
    </div>

  );
}

export default App;
