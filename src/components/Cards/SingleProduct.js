import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../Modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState("Click To Add");

  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const history = useHistory();

  const addToCartHandler = () => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //pushnew product to cart
      cart.push({
        ...product,
        count: 1,
      });
      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");

      //dispatch action
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      //open drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const addToWishlistHandler = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      toast.success("Added to Wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <img src={i.url} alt={i.public_id} key={i.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img src={laptop} alt="noimage" className="mb-3 card-image" />
            }
          />
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            something about product..
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="p-3 bg-info">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <p className="text-center">No rating yet</p>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <span onClick={addToCartHandler} style={{ userSelect: "none" }}>
                <ShoppingCartOutlined className="text-success" /> <br /> Add to
                Cart
              </span>
            </Tooltip>,
            <span onClick={addToWishlistHandler} style={{ userSelect: "none" }}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </span>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
