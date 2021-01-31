import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  values,
  changeHandler,
  submitHandler,
  changeCategoryHandler,
  subOptions,
  showSub,
  setValues,
}) => {
  const {
    title,
    description,
    price,
    categories,
    // category,
    subs,
    // shipping,
    quantity,
    // images,
    colors,
    brands,
    // color,
    // brand,
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
          name="shipping"
          className="form-control"
          onChange={changeHandler}
        >
          <option>Please select</option>
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
        <select name="color" className="form-control" onChange={changeHandler}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={changeHandler}>
          <option>Please select</option>
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
          name="category"
          id="category"
          className="form-control"
          onChange={changeCategoryHandler}
        >
          <option>Please Select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSub && (
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="please select"
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <button type="submit" className="btn btn-outline-info">
        Save
      </button>
    </form>
  );
};

export default ProductCreateForm;
