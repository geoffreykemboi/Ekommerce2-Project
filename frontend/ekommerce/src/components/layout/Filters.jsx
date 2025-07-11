// src/components/layout/Filters.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";
import { PRODUCT_CATEGORIES } from "../constants/Constants";
import StarRatings from "react-star-ratings";

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, [searchParams]);

  //Handle Category & Ratings Filter
  const handleClick = (checkbox) => {
    const checkboxes =document.getElementsByName(checkbox.name)
  
    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });
    if(checkbox.checked === false) {
      if(searchParams.has(checkbox.name)){
        searchParams.delete(checkbox.name);
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
      }
    } else {
      if(searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value)
      }else {
        searchParams.append(checkbox.name, checkbox.value)
      }

      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  // Handle price filter
  const handleSubmit = (e) => {
    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const defaultCheckHandler = (checkboxType, CheckBoxValue) => {
    const value = searchParams.get(checkboxType);
    // ✅ FIX: Changed assignment (=) to comparison (===)
    if(CheckBoxValue === value) return true;
    return false;
  };
  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />

      <h5 className="filter-heading mb-3">Price</h5>
      <form className="px-2" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min (KSH)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max (KSH)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>

    {PRODUCT_CATEGORIES.map((category, idx) => (
      <div className="form-check" key={category}>
        <input
          className="form-check-input"
          type="checkbox"
          name="category"
          id={`check-category-${idx}`}
          value={category}
          defaultChecked={defaultCheckHandler("category", category)}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor={`check-category-${idx}`}>
          {category}
        </label>
      </div>
    ))}
      
      <hr />
      <h5 className="mb-3">Ratings</h5>
 {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check" key={rating}>
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id={`check${rating}`}
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating.toString())}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor={`check${rating}`}>
            <div className="d-flex align-items-center">
              <StarRatings
                rating={rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="18px"
                starSpacing="1px"
              />
              <span className="ms-2 text-muted small">& up</span>
            </div>
          </label>
      </div>
      ))}
    </div>
  );
};

export default Filters;
