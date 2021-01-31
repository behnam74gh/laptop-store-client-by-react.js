import React from "react";

const CategoryForm = ({ submitHandler, name, setName }) => (
  <form onSubmit={submitHandler}>
    <div className="form-group">
      <label></label>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        required
      />
    </div>
    <button type="submit" className="btn btn-outline-primary">
      Save
    </button>
  </form>
);

export default CategoryForm;
