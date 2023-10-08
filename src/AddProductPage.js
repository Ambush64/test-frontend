import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTokenVerification } from './useTokenVerification';
import { toast } from 'react-toastify';

const AddProductPage = () => {
    useTokenVerification();
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        imageLink: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/add-product', productData);
            if (response.status === 200) {
                toast.success('Product added successfully');
                navigate("/product-gallery")
            }
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={productData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                        name="description"
                        id="description"
                        className="form-control"
                        value={productData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageLink">Image Link</label>
                    <input
                        type="text"
                        name="imageLink"
                        id="imageLink"
                        className="form-control"
                        value={productData.imageLink}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;
