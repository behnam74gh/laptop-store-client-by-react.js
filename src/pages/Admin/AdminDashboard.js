import React, { useCallback, useEffect, useState } from "react";
import AdminNav from "../../components/Nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Order from "../../components/Order/Order";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const loadAllOrders = useCallback(
    () =>
      getOrders(user.token).then((res) => {
        console.log(res);
        setOrders(res.data);
      }),
    [user]
  );

  useEffect(() => {
    loadAllOrders();
  }, [loadAllOrders]);

  const changeStatusHandler = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status changed!");
      loadAllOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Admin Dashboard page</h4>
          {/*{JSON.stringify(orders)}*/}
          <Order orders={orders} changeStatusHandler={changeStatusHandler} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
