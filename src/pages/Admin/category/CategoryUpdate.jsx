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
    () => getCategory(match.params.slug).then((c) => setName(c.data.name)),
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
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
