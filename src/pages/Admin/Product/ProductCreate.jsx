import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCreateForm from "../../../components/Forms/ProductCreateForm";
import FileUpload from "../../../components/Forms/FileUpload";
import AdminNav from "../../../components/Nav/AdminNav";
import { LoadingOutlined } from "@ant-design/icons";

import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["black", "brown", "silver", "white", "blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCategories().then((res) =>
      setValues({ ...values, categories: res.data })
    );
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        alert(`${res.data.title} is created.`);
        //for cleaning the inputs value
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(error.response.data.err);
      });
  };

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const changeCategoryHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    console.log(e.target.value);
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
        setShowSub(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product Create</h4>
          )}
          <hr />

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            values={values}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            changeCategoryHandler={changeCategoryHandler}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
