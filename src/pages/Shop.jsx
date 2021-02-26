import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import {
  DollarOutlined,
  DownSquareOutlined,
  LoadingOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { getCategories } from "../functions/category";
import ProductCard from "../components/Cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import Star from "../components/Forms/Star";
import { getSubs } from "../functions/sub";
import Fade from "react-reveal/Fade";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoding] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subs, setSubs] = useState([]);
  const brands = ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"];
  const [brand, setBrand] = useState("");
  const colors = ["black", "brown", "silver", "white", "blue"];
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  //1. load products by default on page load
  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  //the base function
  const fetchProducts = (arg) =>
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });

  const loadAllProducts = () =>
    getProductsByCount(12).then((res) => {
      setLoding(false);
      setProducts(res.data);
    });

  //2. load products on user search input
  useEffect(() => {
    //reset other filterings
    setCategoryIds([]);
    setPrice([0, 0]);
    setBrand("");
    setColor("");
    setShipping("");

    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //3. load products based on price range
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const sliderHandler = (value) => {
    //reset other filterings
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping("");

    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  //4. load products based on category
  //show categories in a list of checkbox
  const showCategories = () => {
    return categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={changeHandler}
          className="px-4 pb-2"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));
  };
  //changeHandler for categories
  const changeHandler = (e) => {
    //reset other filterings
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setBrand("");
    setColor("");
    setShipping("");

    let categories = [...categoryIds];
    let checked = e.target.value;
    let index = categories.indexOf(checked); //index or -1
    //if there is not this category
    if (index === -1) {
      categories.push(checked);
    } else {
      categories.splice(index, 1);
    }

    setCategoryIds(categories);
    // console.log(categories);
    fetchProducts({ category: categories });
  };

  //5. show products based rating
  const starClickHandler = (num) => {
    //reset other filterings
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping("");

    // console.log(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="px-4 pb-2">
      <Star starClick={starClickHandler} numberOfStars={5} />
      <Star starClick={starClickHandler} numberOfStars={4} />
      <Star starClick={starClickHandler} numberOfStars={3} />
      <Star starClick={starClickHandler} numberOfStars={2} />
      <Star starClick={starClickHandler} numberOfStars={1} />
    </div>
  );

  //6. show products based on sub
  const showSubs = () =>
    subs.map((s) => (
      <span
        key={s._id}
        onClick={() => subHandler(s)}
        className="col-3 mx-2 mb-2 p-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </span>
    ));

  const subHandler = (sub) => {
    //reset other filterings
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping("");

    fetchProducts({ sub });
  };

  //7. show products based on brands
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        name={b}
        checked={b === brand}
        onChange={brandHandler}
        className="pb-1 px-4 w-100"
      >
        {b}
      </Radio>
    ));

  const brandHandler = (e) => {
    //reset other filterings
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setColor("");
    setShipping("");

    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  //8. show products based on colors
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={colorHandler}
        className="pb-1 px-4 w-100"
      >
        {c}
      </Radio>
    ));

  const colorHandler = (e) => {
    //reset other filterings
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setShipping("");

    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  };

  //9. show products based shipping Yes/No
  const showShipping = () => (
    <div className="row px-4">
      <Checkbox
        value="Yes"
        onChange={shippingHandler}
        checked={shipping === "Yes"}
        className="pb-1 pr-4 d-block"
      >
        Yes
      </Checkbox>
      <Checkbox
        value="No"
        onChange={shippingHandler}
        checked={shipping === "No"}
        className="pb-1 pr-4 d-block"
      >
        No
      </Checkbox>
    </div>
  );

  const shippingHandler = (e) => {
    //reset other filterings
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setColor("");

    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>
        <Fade bottom big>
          <div className="col-lg-3 col-md-4 col-sm-5 mt-5 pt-4">
            <h4>Search/Filter</h4>
            <hr />
            <Menu
              mode="inline"
              defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            >
              {/* Price */}
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined />
                    Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="mx-4"
                    range
                    tipFormatter={(v) => `$${v}`}
                    value={price}
                    onChange={sliderHandler}
                    max="4999"
                  />
                </div>
              </SubMenu>
              {/* Category */}
              <SubMenu
                key="2"
                title={
                  <span className="h6">
                    <DownSquareOutlined />
                    Category
                  </span>
                }
              >
                <div>{showCategories()}</div>
              </SubMenu>

              {/* Rating */}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined />
                    Ratings
                  </span>
                }
              >
                <div>{showStars()}</div>
              </SubMenu>

              {/* Sub Categories */}
              <SubMenu
                key="4"
                title={
                  <span className="h6">
                    <DownSquareOutlined />
                    Sub Categories
                  </span>
                }
              >
                <div className="row px-4">{showSubs()}</div>
              </SubMenu>

              {/* Brands */}
              <SubMenu
                key="5"
                title={
                  <span className="h6">
                    <DownSquareOutlined />
                    Brands
                  </span>
                }
              >
                <div className="row px-4">{showBrands()}</div>
              </SubMenu>

              {/* Colors */}
              <SubMenu
                key="6"
                title={
                  <span className="h6">
                    <DownSquareOutlined />
                    Colors
                  </span>
                }
              >
                <div className="row px-4">{showColors()}</div>
              </SubMenu>

              {/* Shipping */}
              <SubMenu
                key="7"
                title={
                  <span className="h6">
                    <DownSquareOutlined />
                    Shipping
                  </span>
                }
              >
                {showShipping()}
              </SubMenu>
            </Menu>
          </div>
        </Fade>
        <div className="col-lg-9 col-md-8 mt-5 col-sm-7 pt-4">
          <div>
            {loading ? (
              <LoadingOutlined className="text-danger h1" />
            ) : (
              <h4 className="text-danger">
                <Fade right big cascade>
                  Products
                </Fade>
              </h4>
            )}

            {products.length < 1 && (
              <h6>
                <Fade bottom big cascade>
                  No Products Found
                </Fade>
              </h6>
            )}
          </div>
          <div className="row pb-5">
            {products.map((p) => (
              <Fade big key={p._id}>
                <div className="col-lg-4 col-md-6 my-2">
                  <ProductCard product={p} />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
