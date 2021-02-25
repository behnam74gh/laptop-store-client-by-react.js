import React, { useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../Cards/LoadingCard";
import { Pagination } from "antd";
import Slide from "react-reveal/Slide";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProducts("sold", "desc", page)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((p) => (
              <Slide bottom big key={p._id}>
                <div className="col-md-4">
                  <ProductCard product={p} />
                </div>
              </Slide>
            ))}
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center py-4">
        <Pagination
          current={page}
          total={(productsCount / 3) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
};

export default BestSellers;
