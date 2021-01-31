import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const history = useHistory();
  const { slug } = useParams();

  const modalHandler = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={modalHandler}>
        <StarOutlined className="text-danger" /> <br />
        {user ? "Leave Rating" : "Login to Leave Rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.warning("Thanks for your review. It will apear soon!");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
