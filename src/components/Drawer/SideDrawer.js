import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Laptop from "../../images/laptop.jpg";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const closeDrawer = () =>
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });

  return (
    <Drawer
      className="text-center"
      closable={false}
      onClose={closeDrawer}
      title={`Cart / ${cart.length} Products`}
      visible={drawer}
    >
      <div className="row">
        {cart.map((p) => (
          <div key={p._id} className="col-12 w-100">
            {p.images[0] ? (
              <>
                <img
                  src={p.images[0].url}
                  alt={p.title}
                  style={{ width: "100%", height: "auto" }}
                />
                <span className="mb-3 bg-secondary text-light d-block">
                  {p.title} x {p.count}
                </span>
              </>
            ) : (
              <>
                <img
                  src={Laptop}
                  alt="default pic"
                  style={{ width: "100%", height: "auto" }}
                />
                <span className="mb-3 bg-secondary text-light d-block">
                  {p.title} x {p.count}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
      <Link to="/cart">
        <button
          onClick={closeDrawer}
          className="text-center btn btn-info btn-block"
        >
          Go to Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
