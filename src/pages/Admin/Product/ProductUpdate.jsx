import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FileUpload from "../../../components/Forms/FileUpload";
import AdminNav from "../../../components/Nav/AdminNav";
import { LoadingOutlined } from "@ant-design/icons";

import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductUpdateForm from "../../../components/Forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
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

const ProductUpdate = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  const loadProduct = useCallback(() => {
    getProduct(slug)
      .then((p) => {
        setValues({ ...values, ...p.data });
        getCategorySubs(p.data.category._id).then((res) => {
          setSubOptions(res.data);
        });
        let arr = [];
        p.data.subs.map((s) => arr.push(s._id));
        setArrayOfSubIds(arr);
      })
      .catch((err) => console.log(err));
  }, [slug, values]);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [loadProduct]);

  const loadCategories = () =>
    getCategories().then((res) => setCategories(res.data));

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success(`${res.data.title} is updated.`);
        history.push("/admin/products");
      })
      .catch((error) => {
        setLoading(false);
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
    setSelectedCategory(e.target.value);
    setArrayOfSubIds([]);
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
        setShowSub(true);
      })
      .catch((err) => console.log(err));
    if (values.category._id === e.target.value) {
      loadProduct();
    }
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
            <h4>Product Update</h4>
          )}
          <hr />

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            values={values}
            setValues={setValues}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            changeCategoryHandler={changeCategoryHandler}
            subOptions={subOptions}
            showSub={showSub}
            setLoading={setLoading}
            categories={categories}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
