import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/Cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setLoading(false);
      setCategory(res.data.category);
      setProducts(res.data.products);
      console.log(JSON.stringify(res.data, null, 4));
    });
  }, [slug]);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
              Loading ...
            </h4>
          ) : (
            <h1 className="text-center p-3 my-5 jumbotron">
              {products.length} products in "{category.name}" category
            </h1>
          )}
        </div>
      </div>
      <div className="row px-5" style={{ minHeight: "100vh" }}>
        {products.map((p) => (
          <div key={p._id} className="col-md-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
