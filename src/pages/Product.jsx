import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../components/Cards/SingleProduct";
import { getProduct, productStar } from "../functions/product";
import { getRelated } from "../functions/product";
import ProductCard from "../components/Cards/ProductCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);
  const { slug } = match.params;

  const { user } = useSelector((state) => ({ ...state }));

  const loadSingleProduct = useCallback(
    () =>
      getProduct(slug)
        .then((res) => {
          setProduct(res.data);
          //get related products
          getRelated(res.data._id).then((res) => setRelated(res.data));
        })
        .catch((err) => console.log(err)),
    [slug]
  );
  useEffect(() => {
    loadSingleProduct();
  }, [loadSingleProduct]);

  useEffect(() => {
    if (product.ratings && user) {
      const existRatingObject = product.ratings.find(
        (r) => r.postedBy.toString() === user._id.toString()
      );
      existRatingObject && setStar(existRatingObject.star);
    }
  }, [product.ratings, user]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);

    productStar(name, newRating, user.token)
      .then((res) => {
        console.log(res.data);
        loadSingleProduct();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row py-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center py-4">
          <hr />
          <h4>Releated Products</h4>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div className="col-md-4" key={r._id}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="col text-center">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
