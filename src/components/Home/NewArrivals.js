import React, { useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../Cards/LoadingCard";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProducts("createdAt", "desc", page)
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
              <div className="col-md-4" key={p._id}>
                <ProductCard product={p} />
              </div>
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

export default NewArrivals;
