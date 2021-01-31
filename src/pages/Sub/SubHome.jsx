import React, { useEffect, useState } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/Cards/ProductCard";

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      setLoading(false);
      setSub(res.data.sub);
      setProducts(res.data.products);
      console.log(JSON.stringify(res.data, null, 4));
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
              Loading ...
            </h4>
          ) : (
            <h1 className="text-center p-3 my-5 jumbotron">
              {products.length} products in "{sub.name}" sub category
            </h1>
          )}
        </div>
      </div>
      <div className="row px-5">
        {products.map((p) => (
          <div key={p._id} className="col-md-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
