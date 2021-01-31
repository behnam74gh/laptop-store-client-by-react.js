import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";

//load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(
  "pk_test_51IDoGJFKEHUygocBpFEPy5p8kNgFbrMSFZdlWNQULv1zuSqBlQw60OSym8kWGBDsmEjcvfqVtF7cKyESUaKCjhix00Te4tTeTU"
);

const Payment = () => {
  return (
    <div className="container text-center p-5">
      <h4>complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
