import React, { useEffect, useState } from "react";
import AdminProductCard from "../../../components/Cards/AdminProductCard";
import AdminNav from "../../../components/Nav/AdminNav";
import { useSelector } from "react-redux";
import { getProductsByCount } from "../../../functions/product";
import { removeProduct } from "../../../functions/product";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const removeProductHandler = (slug) => {
    if (window.confirm("Delete?")) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted!`);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="container-fluid mt-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-sm-2 mt-4 pl-md-5 pl-3 pr-0">
          <AdminNav />
        </div>
        <div className="col-sm-10 mt-4">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4 col-sm-6" key={p._id}>
                <AdminProductCard
                  product={p}
                  removeProductHandler={removeProductHandler}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
