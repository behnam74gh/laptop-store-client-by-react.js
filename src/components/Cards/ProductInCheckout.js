import React from "react";
import ModalImage from "react-modal-image";
import Laptop from "../../images/laptop.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductInCheckout = ({ p }) => {
  const colors = ["black", "brown", "silver", "white", "blue"];
  const dispatch = useDispatch();

  const changeColorHandler = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const changeCountHandler = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const removeHandler = () => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      const filteredCart = cart.filter((product) => product._id !== p._id);

      localStorage.setItem("cart", JSON.stringify(filteredCart));
      dispatch({
        type: "ADD_TO_CART",
        payload: filteredCart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto", margin: "0 auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={Laptop} large={Laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={changeColorHandler}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Please Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            value={p.count}
            onChange={changeCountHandler}
            className="form-control"
          />
        </td>
        <td className="text-center pt-4">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-success" />
          )}
        </td>
        <td className="text-center pt-4">
          <CloseOutlined
            onClick={removeHandler}
            className="text-danger"
            style={{ cursor: "pointer" }}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductInCheckout;
