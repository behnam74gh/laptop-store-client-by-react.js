import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("emailForRegistration")) {
      history.push("/");
    }
    setEmail(localStorage.getItem("emailForRegistration"));
  }, [email, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("email and password is not required");
      return;
    }

    if (password.length < 6) {
      toast.error("password must be at least 6 character!");
      return;
    }

    try {
      axios
        .post(`${process.env.REACT_APP_API}/registerComplete`, {
          email,
          password,
          name,
        })
        .then((res) => {
          if (res.data.success) {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: res.data.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            localStorage.removeItem("emailForRegistration");
            history.push("/");
          } else {
            toast.error(res.data.errorMessage);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const CompleteRegisterationForm = (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
      </div>

      <button type="submit" className="btn btn-light shadow-lg mt-3">
        Complete Registeration
      </button>
    </form>
  );

  return (
    <div className="container pt-5 mt-5" style={{ minHeight: "100vh" }}>
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {CompleteRegisterationForm}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
