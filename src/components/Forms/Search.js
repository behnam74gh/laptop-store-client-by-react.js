import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const changeHandler = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={submitHandler}>
      <input
        type="search"
        value={text}
        onChange={changeHandler}
        className="form-control mr-sm-2"
        placeholder="Search"
      />
      <SearchOutlined onClick={submitHandler} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
