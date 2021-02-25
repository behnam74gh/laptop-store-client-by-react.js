import React, { useState } from "react";
import UserNav from "../../components/Nav/UserNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.user);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 6) {
      toast.error("password is To Short!");
      return;
    }
    axios
      .put(
        `${process.env.REACT_APP_API}/changePassword`,
        { newPass: password },
        { headers: { authtoken: `bearer ${token}` } }
      )
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        setPassword("");
      })
      .catch((err) => console.log(err));
  };

  const passwordUpdateForm = (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          placeholder="Enter new Password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      <button
        className="btn btn-primary"
        disabled={!password || password.length < 6 || loading}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div className="container-fluid mt-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-2 mt-4">
          <UserNav />
        </div>
        <div className="col-10 mt-4">
          {loading ? (
            <h4 className="text-danger">Loading ..</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwordUpdateForm}
        </div>
      </div>
    </div>
  );
};

export default Password;
