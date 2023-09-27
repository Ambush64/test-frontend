import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const ProductCard = ({
  name,
  gender,
  price,
  mobile_number,
  deleteAction,
  editAction,
  bio
}) => {
  return (
    <div className="card-product">
      <div className="card-product-header">
        <div className="card-product-header-details">
          <h1 className="product-brand">{name}</h1>
          <p className="product-categories">{gender}</p>
        </div>
        <Dropdown
          icon="bx bx-dots-vertical-rounded"
          menu={
            <>
              <li className="dropdown-list">
                <li className="dropdown-list" onClick={() => editAction()}>
                  <button className="dropdown-link">
                    {/* <i className="bx bx-edit dropdown-link-icon"></i> */}
                    Edit
                  </button>
                </li>
                {/* <Link to="/admin/product/edit/:id" className="dropdown-link">
                  <i className="bx bx-edit dropdown-link-icon"></i>
                  Edit
                </Link> */}
              </li>
              <li className="dropdown-list" onClick={() => deleteAction()}>
                <button className="dropdown-link">
                  {/* <i className="bx bx-trash dropdown-link-icon"></i> */}
                  Delete
                </button>
              </li>
            </>
          }
        />
      </div>
      <div className="card-product-body">
        <div className="flex-item">
          <p className="product-price">ID: {price}</p>
        </div>
        <div className="product-rate">
          <p className="rate">{mobile_number}</p>
          <p className="d-block">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
