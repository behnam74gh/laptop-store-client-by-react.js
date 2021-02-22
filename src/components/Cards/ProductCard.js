import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;
  const [tooltip, setTooltip] = useState("Click To Add");

  const dispatch = useDispatch();

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

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <p className="text-center">No rating yet</p>
      )}
      <Card
        className="my-3"
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            alt="img"
            style={{ maxHeight: "250px", padding: "5px" }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a
              href="#!"
              disabled={product.quantity < 1}
              onClick={addToCartHandler}
              style={{ userSelect: "none" }}
            >
              <ShoppingCartOutlined className="text-success" /> <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description.substring(0, 20)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
