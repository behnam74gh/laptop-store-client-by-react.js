import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import defPic from "../../images/pro.jpg";
import LikeDislike from "./LikeDislike";

const SingleComment = ({ comment, refreshComments }) => {
  const [showForm, setShowForm] = useState(false);
  const [repleyComment, setRepleyComment] = useState("");

  const user = useSelector((state) => state.user);

  const changeHandler = (e) => {
    // console.log(e.target.value);
    setRepleyComment(e.target.value);
  };

  const submitCommentHandler = (e) => {
    e.preventDefault();
    // console.log(repleyComment);

    const data = {
      content: repleyComment,
      writer: user._id,
      postId: comment.postId,
      responseTo: comment._id,
    };
    // console.log(data);
    axios
      .post(`${process.env.REACT_APP_API}/comment/saveComment`, data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setRepleyComment("");
          refreshComments(res.data.savedComment);
          setShowForm(false);
        } else {
          console.log(res.data.error);
          alert("faild to save repleycomment");
        }
      });
  };

  return (
    <div>
      <div className="row" style={{ margin: "0 20px" }}>
        <img src={defPic} alt="pic" style={{ width: "50px", height: "50px" }} />
        <div style={{ width: "80%", paddingTop: "10px", margin: "0 20px" }}>
          <span style={{ color: "#788490" }}>{comment.writer.name}</span>
          <p>{comment.content}</p>
          <div>
            <LikeDislike commentId={comment._id} userId={user._id} />
            <span
              onClick={() => setShowForm(!showForm)}
              style={{ fontSize: "12px", color: "#788490", cursor: "pointer" }}
            >
              Repley to
            </span>
          </div>
        </div>
      </div>
      {showForm && (
        <form
          style={{ display: "flex", flexDirection: "column", margin: "10px" }}
          onSubmit={submitCommentHandler}
        >
          <textarea
            rows="4"
            value={repleyComment}
            onChange={changeHandler}
            placeholder="write your comment"
          />
          <button
            style={{
              marginTop: "5px",
              background: "#3777d6",
              color: "white",
            }}
            type="submit"
          >
            send
          </button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
