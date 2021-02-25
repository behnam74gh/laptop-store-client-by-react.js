import React, { useCallback, useEffect, useState } from "react";
import UserNav from "../../components/Nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const loadWishlist = useCallback(
    () =>
      getWishlist(user.token).then((res) => {
        setWishlist(res.data.wishlist);
        // console.log(res.data);
      }),
    [user]
  );

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const removeHandler = (productId) =>
    removeWishlist(productId, user.token).then((res) => loadWishlist());

  return (
    <div className="container-fluid mt-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-2 mt-4">
          <UserNav />
        </div>
        <div className="col-10 mt-4">
          <h4>Wishlist</h4>
          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => removeHandler(p._id)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
