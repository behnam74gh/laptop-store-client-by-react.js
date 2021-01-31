import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
        console.log("Error message in forgot password", err);
      });
  };

  return (
    <div className="container col-6 offset-col-3 mt-5 pt-5">
      {loading ? (
        <h4 className="mb-4">Loading ...</h4>
      ) : (
        <h4 className="mb-4">Forgot Password</h4>
      )}

      <form onSubmit={submitHandler}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Type Your E-mail"
          autoFocus
        />
        <button
          type="submit"
          className="btn btn-light shadow-lg mt-3"
          disabled={!email}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
