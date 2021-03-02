import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../components/Nav/AdminNav";
import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/Forms/CategoryForm";

const SubUpdate = ({ match, history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  const loadCategories = useCallback(
    () => getCategories().then((c) => setCategories(c.data)),
    []
  );

  const loadSub = useCallback(
    () =>
      getSub(match.params.slug).then((s) => {
        // console.log(s.data);
        setName(s.data.sub.name);
        setParent(s.data.sub.parent);
      }),
    [match.params.slug]
  );

  useEffect(() => {
    loadSub(match.params.slug);
    loadCategories();
  }, [match.params.slug, loadSub, loadCategories]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated!`);
        history.push("/admin/sub");
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

          <div className="form-group">
            <label htmlFor="category">Parent Category</label>
            <select
              name="category"
              id="category"
              className="form-control"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

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

export default SubUpdate;
