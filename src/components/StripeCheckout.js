import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import Laptop from "../images/laptop.jpg";
import { createOrder, emptyUserCart } from "../functions/user";

const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const { user, coupon } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("create Payment Intent", res.data);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          //empty localStorage,Redux,DB
          if (typeof window !== undefined) localStorage.removeItem("cart");
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          emptyUserCart(user.token);
        }
      });
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const changeHandler = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <React.Fragment>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total After Discount ${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No Coupon Applied</p>
          )}
        </div>
      )}

      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={Laptop}
              alt="laptop"
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <React.Fragment>
              <DollarOutlined className="text-info" /> <br /> Total : $
              {cartTotal}
            </React.Fragment>,
            <React.Fragment>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </React.Fragment>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={submitHandler}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={changeHandler}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your Purchase History.</Link>
        </p>
      </form>
    </React.Fragment>
  );
};

export default StripeCheckout;
