import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createCashOrderForUser } from "../functions/user";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponRedux = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(res);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.token]);

  const saveAddressToDb = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("address saved!");
      }
    });
  };

  const emptyCartHandler = () => {
    //empty localStorage
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
    }
    //empty Redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    //empty Db
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is Empty. Continue Shopping!");
    });
  };

  const applyDiscountCoupon = () => {
    console.log("coupon ---->", coupon);
    applyCoupon(coupon, user.token).then((res) => {
      console.log("Res on Coupon applied", res.data.message);
      console.log("Res on Coupon applied", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        //update redux applied coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }

      if (res.data.message) {
        setDiscountError(res.data.message);
        //update redux applied coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const createCashOrder = () =>
    createCashOrderForUser(user.token, COD, couponRedux).then((res) => {
      // console.log("user cash order",res)
      //empty cart from redux,localStorage,DB,reset coupon and COD, redirect
      if (res.data.ok) {
        //empty localStorage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        //empty Redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        //empty Redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        //empty Redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        //empty cart from DB
        emptyUserCart(user.token);
        //redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-info mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        value={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        className="form-control"
      />
      <button
        onClick={applyDiscountCoupon}
        className="btn btn-outline-primary mt-2"
      >
        Apply
      </button>
    </>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Access</h4>
          <br />
          <br />
          {showAddress()}
          <hr />
          <h4>Got Coupon?</h4>
          <br />
          {showApplyCoupon()}
          <br /> <br />
          {discountError && (
            <p className="bg-danger text-light p-2">{discountError}</p>
          )}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />

          {showProductSummary()}

          <hr />
          <p>Cart Total: ${total}</p>
          {totalAfterDiscount > 0 && (
            <p className="bg-success p-2">
              Discount applied: Total payable ${totalAfterDiscount}
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              {COD ? (
                <button
                  disabled={!addressSaved || !products.length}
                  className="btn btn-primary"
                  onClick={createCashOrder}
                >
                  Place Order delivery
                </button>
              ) : (
                <button
                  disabled={!addressSaved || !products.length}
                  className="btn btn-primary"
                  onClick={() => history.push("/payment")}
                >
                  Place Order
                </button>
              )}
            </div>
            <div className="col-md-6">
              <button
                onClick={emptyCartHandler}
                disabled={!products.length}
                className="btn btn-primary"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
