import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/register/complete",
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click to link to complete your registration`
    );
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const registerForm = (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-light shadow mt-3">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm}
        </div>
      </div>
    </div>
  );
};

export default Register;
