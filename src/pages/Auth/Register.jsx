import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import ReCAPTCHA from "react-google-recaptcha";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [expired, setExpired] = useState(true);

  const SITE_KEY = "6LcsLmwaAAAAAC4STevKpntx2mfuK5gu07avo5is";

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expired) {
      axios
        .post(`${process.env.REACT_APP_API}/register`, { email })
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            toast.success(res.data.message);
            localStorage.setItem("emailForRegistration", email);
            setEmail("");
          } else {
            toast.error(res.data.errorMessage);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("Please Select ReCaptcha!");
    }
  };

  const changeRecaptchaHandler = (value) => {
    // console.log(value);

    if (value !== null) {
      axios
        .post(`${process.env.REACT_APP_API}/recaptcha`, { secToken: value })
        .then((res) => {
          if (res.data.success) {
            setExpired(false);
            // console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    <div className="container mt-5 pt-5" style={{ minHeight: "100vh" }}>
      <div className="row mt-4">
        <Fade bottom>
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            {registerForm}
            <br />
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={changeRecaptchaHandler}
              style={{ display: "inline-block" }}
            />
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Register;
