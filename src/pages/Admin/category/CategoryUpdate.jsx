import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../components/Nav/AdminNav";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/Forms/CategoryForm";

const CategoryUpdate = ({ match, history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const loadCategory = useCallback(
    () =>
      getCategory(match.params.slug).then((c) => setName(c.data.category.name)),
    [match.params.slug]
  );

  useEffect(() => {
    loadCategory(match.params.slug);
  }, [match.params.slug, loadCategory]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created!`);
        history.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid mt-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-sm-2 mt-4 pl-md-5 pl-3 pr-0">
          <AdminNav />
        </div>
        <div className="col-sm-10 mt-4">
          {loading ? (
            <h4 className="text-danger">Loading ...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
          <CategoryForm
            name={name}
            submitHandler={submitHandler}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
