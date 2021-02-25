import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/Nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from "../../../functions/coupon";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons()
      .then((res) => setCoupons(res.data))
      .catch((err) => console.log(err));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name, discount, expiry);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        getCoupons().then((res) => setCoupons(res.data));
        setName("");
        setExpiry("");
        setDiscount("");
        toast.success(`"${res.data.name}" is created!`);
      })
      .catch((err) => console.log("create coupon error", err));
  };

  const removeCouponHandler = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          getCoupons().then((res) => setCoupons(res.data));
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" is deleted!`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-fluid mt-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-sm-2 mt-4 pl-md-5 pl-3 pr-0">
          <AdminNav />
        </div>
        <div className="col-sm-10 mt-4">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Coupon</h4>
          )}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control"
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                onChange={(date) => setExpiry(date)}
                value={expiry}
                className="form-control"
                required
                selected={new Date()}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Save
            </button>
          </form>
          <br />
          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="tehead-light text-center">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => removeCouponHandler(c._id)}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
