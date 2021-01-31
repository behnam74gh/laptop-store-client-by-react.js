import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductInCheckout from "../components/Cards/ProductInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    let total = cart.reduce((a, c) => a + c.count * c.price, 0);
    return total;
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart POST response:", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("Save cart to db error:", err));
  };

  //saveCashOrderToDb
  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });

    userCart(cart, user.token)
      .then((res) => {
        console.log("Cart POST response:", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("Save cart to db error:", err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>
          {!cart.length ? (
            <p>
              No Product in Cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            <div>{showCartItems()}</div>
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((p, i) => (
            <div key={i}>
              <p>
                {p.title} x {p.count} = ${p.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <React.Fragment>
              <button
                onClick={saveOrderToDb}
                disabled={!cart.length}
                className="btn btn-sm btn-primary mt-2"
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                disabled={!cart.length}
                className="btn btn-sm btn-warning mt-2"
              >
                Pay Cash On Delivery
              </button>
            </React.Fragment>
          ) : (
            <button className="btn btn-sm btn-outline-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
