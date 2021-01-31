import React from "react";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import laptop from "../../images/laptop.jpg";

const { Meta } = Card;

const AdminProductCard = ({ product, removeProductHandler }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      className="my-3"
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          alt="mmm"
          style={{ maxHeight: "250px", padding: "5px" }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => removeProductHandler(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta title={title} description={`${description.substring(0, 20)}...`} />
    </Card>
  );
};

export default AdminProductCard;
