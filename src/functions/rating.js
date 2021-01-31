import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));

    let totalReduced = total.reduce((a, c) => a + c, 0);

    let highest = length * 5;

    let result = (totalReduced * 5) / highest;

    return (
      <div className="d-flex justify-content-center pb-3">
        <span>
          <StarRating
            rating={result}
            starRatedColor="red"
            starDimension="20px"
            starSpacing="2px"
          />
        </span>
        <span className="align-self-end pl-2">({length})</span>
      </div>
    );
  }
};
