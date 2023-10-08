import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useTokenVerification } from './useTokenVerification';

function ProductGallery() {
    useTokenVerification();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { cart, dispatch } = useCart();


    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, id: product._id } });

        localStorage.setItem('cart', JSON.stringify([...cart, { ...product, id: product._id }]));
    };



    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Product Gallery</h2>
                {cart.length > 0 && (
                    <button className="btn btn-success" onClick={() => navigate("/view-cart")}>
                        View Cart ({cart.length})
                    </button>
                )}

            </div>
            <div className="row">
                {products.map((product) => (
                    <div key={product._id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={product.imageLink} className="card-img-top" alt={product.product_name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.product_name}</h5>
                                <p className="card-text">${product.price}</p>
                                <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-info" onClick={() => navigate("/add-product")}>Add Product
            </button>
        </div >
    );
}

export default ProductGallery;
