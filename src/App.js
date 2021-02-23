import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

import SideDrawer from "./components/Drawer/SideDrawer";
import Header from "./components/Nav/Header";
import UserRoute from "./components/Routes/UserRoute";
import AdminRoute from "./components/Routes/AdminRoute";
//lazy
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const RegisterComplete = lazy(() => import("./pages/Auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const History = lazy(() => import("./pages/User/History"));
const Password = lazy(() => import("./pages/User/Password"));
const Wishlist = lazy(() => import("./pages/User/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/Admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/Admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/Admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/Admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/Admin/Product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/Admin/Product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/Admin/Product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/Category/CategoryHome"));
const SubHome = lazy(() => import("./pages/Sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() =>
  import("./pages/Admin/Coupon/CreateCouponPage")
);
const Payment = lazy(() => import("./pages/Payment"));

const App = () => {
  const dispatch = useDispatch();

  // let env = process.env.REACT_APP_API;
  // console.log("env-------------->", env);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            // console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __React Redux EC
          <LoadingOutlined />
          MMERCE__
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/complete" exact component={RegisterComplete} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <UserRoute path="/user/history" exact component={History} />
        <UserRoute path="/user/password" exact component={Password} />
        <UserRoute path="/user/wishlist" exact component={Wishlist} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={CategoryCreate} />
        <AdminRoute
          path="/admin/category/:slug"
          exact
          component={CategoryUpdate}
        />
        <AdminRoute path="/admin/sub" exact component={SubCreate} />
        <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate} />
        <AdminRoute path="/admin/product" exact component={ProductCreate} />
        <AdminRoute path="/admin/products" exact component={AllProducts} />
        <AdminRoute
          path="/admin/product/:slug"
          exact
          component={ProductUpdate}
        />
        <Route path="/product/:slug" exact component={Product} />
        <Route path="/category/:slug" exact component={CategoryHome} />
        <Route path="/sub/:slug" exact component={SubHome} />
        <Route path="/shop" exact component={Shop} />
        <UserRoute path="/cart" exact component={Cart} />
        <UserRoute path="/checkout" exact component={Checkout} />
        <AdminRoute path="/admin/coupon" exact component={CreateCouponPage} />
        <UserRoute path="/payment" exact component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
