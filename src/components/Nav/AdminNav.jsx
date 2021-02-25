import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link pl-0 pr-2">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/product" className="nav-link pl-0 pr-2">
            Product
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/products" className="nav-link pl-0 pr-2">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/category" className="nav-link pl-0 pr-2">
            Category
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/sub" className="nav-link pl-0 pr-2">
            Sub Category
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/coupon" className="nav-link pl-0 pr-2">
            Coupon
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/password" className="nav-link px-0">
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
