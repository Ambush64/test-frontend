import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useTokenVerification } from './useTokenVerification';

function ViewCart() {
    useTokenVerification();
    const { cart, dispatch } = useCart();
    const navigate = useNavigate();

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>View Cart</h2>
                <button className="btn btn-success" onClick={() => navigate("/product-gallery")}>
                    View Product Gallery
                </button>
            </div>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="list-group">
                    {cart.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.name} x {item.quantity ? item.quantity : 1}
                            <span style={{ color: 'black' }} className="badge badge-primary badge-pill">
                                ${(item.price * (item.quantity || 1)).toFixed(2)}
                            </span>

                            <button
                                className="btn btn-danger"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-3">
                <button className="btn btn-primary" onClick={() => navigate("/thank-you")}>
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default ViewCart;
