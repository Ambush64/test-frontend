import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './CartContext';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>

        <App />
      </CartProvider>

    </BrowserRouter>
  </React.StrictMode>
);
