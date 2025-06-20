// src/components/product/ProductItem.jsx

import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ProductItem = ({ product }) => {
  if (!product) return null;

  const {
    _id,
    name,
    price,
    ratings,
    numOfReviews,
    images,
  } = product;

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={images?.[0]?.url || "https://via.placeholder.com/150"}
          alt={name}
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />

        <div className="card-body d-flex justify-content-center flex-column">
          <h5 className="card-title">
            <Link to={`/product/${_id}`}>{name}</Link>
          </h5>

          <div className="ratings mt-auto d-flex align-items-center">
            <StarRatings
              rating={ratings || 0}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />
            <span className="pt-1 ps-2 text-muted">
              {numOfReviews} Reviews
            </span>
          </div>

          <p className="card-text mt-2 fw-bold">${price?.toFixed(2) || "N/A"}</p>

          <Link
            to={`/product/${_id}`}
            className="btn btn-primary btn-block mt-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
