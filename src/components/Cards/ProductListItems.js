import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item border-0">
        Price <span className="label label-default float-right">${price}</span>
      </li>
      {category && (
        <li className="list-group-item border-0">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default float-right"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subs && (
        <li className="list-group-item border-0">
          Sub Categories{" "}
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default ml-3 float-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item border-0">
        Shipping{" "}
        <span className="label label-default float-right">{shipping}</span>
      </li>
      <li className="list-group-item border-0">
        Color <span className="label label-default float-right">{color}</span>
      </li>
      <li className="list-group-item border-0">
        Brand <span className="label label-default float-right">{brand}</span>
      </li>
      <li className="list-group-item border-0">
        Available{" "}
        <span className="label label-default float-right">{quantity}</span>
      </li>
      <li className="list-group-item border-0">
        Sold <span className="label label-default float-right">{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
