import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  values,
  changeHandler,
  submitHandler,
  changeCategoryHandler,
  subOptions,
  setValues,
  categories,
  arrayOfSubIds,
  setArrayOfSubIds,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={changeHandler}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={changeHandler}
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <select
          value={color}
          name="color"
          className="form-control"
          onChange={changeHandler}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select
          value={brand}
          name="brand"
          className="form-control"
          onChange={changeHandler}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          value={selectedCategory ? selectedCategory : category._id}
          name="category"
          id="category"
          className="form-control"
          onChange={changeCategoryHandler}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="please select"
          value={arrayOfSubIds}
          onChange={(value) => setArrayOfSubIds(value)}
        >
          {subOptions &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>
      <br />
      <button type="submit" className="btn btn-outline-info">
        Save
      </button>
    </form>
  );
};

export default ProductUpdateForm;
