import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCard = [];

    for (let i = 0; i < count; i++) {
      totalCard.push(
        <div className="col-md-4" key={i}>
          <Card className="mx-2 my-3">
            <Skeleton active />
          </Card>
        </div>
      );
    }

    return totalCard;
  };

  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
