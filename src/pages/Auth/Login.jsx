import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Fade from "react-reveal/Fade";
import ReCAPTCHA from "react-google-recaptcha";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(true);

  const SITE_KEY = "6LcsLmwaAAAAAC4STevKpntx2mfuK5gu07avo5is";

  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!expired) {
        axios
          .post(`${process.env.REACT_APP_API}/login`, { email, password })
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
              roleBasedRedirect(res);
            } else {
              console.log("------>", res.data);
              toast.error(res.data.errorMessage);
            }
          });
      } else {
        toast.error("recaptcha must be choosen!");
      }
    } catch (error) {
      console.log("====>", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginForm = (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          autoComplete="true"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        icon={<MailOutlined />}
        type="primary"
        onClick={handleSubmit}
        block
        shape="round"
        className="mb-3"
        size="large"
        disabled={!email || password.length < 6 || expired}
      >
        Login with Email/Password
      </Button>
    </form>
  );

  const googleLogin = () => {
    // auth
    //   .signInWithPopup(googleAuthProvider)
    //   .then(async (result) => {
    //     const { user } = result;
    //     const idTokenResult = await user.getIdTokenResult();
    //     createOrUpdateUser(idTokenResult.token).then((res) => {
    //       dispatch({
    //         type: "LOGGED_IN_USER",
    //         payload: {
    //           name: res.data.name,
    //           email: res.data.email,
    //           token: idTokenResult.token,
    //           role: res.data.role,
    //           _id: res.data._id,
    //         },
    //       });
    //       roleBasedRedirect(res);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error(err.message);
    //   });
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

  return (
    <div className="container mt-5 pt-5" style={{ minHeight: "100vh" }}>
      <div className="row mt-4">
        <Fade left>
          <div className="col-6 offset-3">
            {loading ? (
              <h4 className="text-danger">Loading ...</h4>
            ) : (
              <h4>Login</h4>
            )}
            {loginForm}
            <ReCAPTCHA
              sitekey={SITE_KEY}
              onChange={changeRecaptchaHandler}
              style={{ display: "inline-block" }}
              theme="dark"
            />
            <Button
              icon={<GoogleOutlined />}
              onClick={googleLogin}
              type="danger"
              block
              shape="round"
              size="large"
            >
              Login with google
            </Button>
            <Link to="/forgot/password" className="float-left text-danger mt-3">
              Forgot Password ?
            </Link>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Login;
