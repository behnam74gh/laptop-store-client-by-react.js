import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = categories.map((c) => (
    <div
      key={c._id}
      className="col btn btn-outline-primary btn-lg btn-block m-3"
    >
      <Link to={`/category/${c.slug}`}>{c.name}</Link>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <LoadingOutlined className="text-danger h1" />
        ) : (
          showCategories
        )}
      </div>
    </div>
  );
};

export default CategoryList;
