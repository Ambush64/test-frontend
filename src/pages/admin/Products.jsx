import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dialog from "../../components/Dialog";
import ProductCard from "../../components/ProductCard";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const [data, setData] = useState([]);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    name: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    gender: '',
    name: '',
    experience: '',
    mobile_number: '',
    short_bio: '',
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/astrologers');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, []);


  const handleDelete = (id) => {
    window.confirm("Are you sure you want to delete")
    // const index = dataProduct.findIndex((product) => product.id === id);
    // handleDialog(
    //   "Are you sure you want to delete",
    //   true,
    //   dataProduct[index].name
    // );
    // idProductRef.current = id;
  };
  const confirmDelete = (choose) => {
    // if (choose) {
    //   setProducts(
    //     products.filter((product) => product.id !== idProductRef.current)
    //   );
    //   handleDialog("", false);
    // } else {
    //   handleDialog("", false);
    // }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/astrologers/${id}`);

      setFormData(response.data);

    } catch (error) {
      console.error('Error:', error);
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const response = await axios.put(`http://localhost:8090/api/astrologers/${formData.id}`, formData);

    // Check the HTTP status code in the response
    if (response.status === 200) {
      alert("successful")
      setShowModal(false);

    } else {
      alert("unsuccessful")
      console.log('Unexpected status code:', response.status);
    }
  };



  return (
    <React.Fragment>

      <div className="mb-2">
        <nav className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/dashboard" className="breadcrumb-link">
              <span className="breadcrumb-link-icon">
                <i className="bx bx-home-alt"></i>
              </span>
              Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item active">Astrologer</li>
        </nav>
      </div>
      <div className="grid-box">
        {data.map((item, idx) => (
          <ProductCard
            key={idx}
            gender={item.gender}
            name={item.name}
            price={item.id}
            mobile_number={item.mobile_number}
            bio={item.short_bio}
            deleteAction={() => handleDelete(item.id)}
            editAction={() => handleEdit(item.id)}
          />
        ))}
      </div>
      {dialog.isLoading && (
        <Dialog
          onDialog={confirmDelete}
          name={dialog.name}
          message={dialog.message}
        />
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <input
                type="text"
                className="form-control"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile_number">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="short_bio">Bio</label>
              <input
                type="text"
                className="form-control"
                id="short_bio"
                name="short_bio"
                value={formData.short_bio}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Products;
