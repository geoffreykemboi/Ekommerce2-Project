import React, { useEffect, useState, useMemo } from 'react';
import { useGetProductDetailsQuery } from '../../redux/api/productsApi';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';
import StarRatings from 'react-star-ratings';

const ProductDetails = () => {
  const params = useParams();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);

  // Memoize the product object to prevent re-creation on every render
  const product = useMemo(() => data?.product || {}, [data]);

  // State to manage the currently displayed large image
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    // Set the initial active image to the first image from the product data when it loads
    if (product?.images && product.images.length > 0) {
      setActiveImg(product.images[0].url);
    }
  }, [product]);

  useEffect(() => {
    // Handle API errors
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product._id) {
    return <div className="alert alert-danger">Product not found.</div>;
  }

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        {/* Main Image */}
        <div className="p-3">
          <img
            className="d-block w-100"
            // Display the active image from state, with a fallback
            src={activeImg || '/images/default_product.png'}
            alt={product?.name}
            width="340"
            height="390"
          />
        </div>
        {/* Thumbnail Images */}
        <div className="row justify-content-start mt-5">
          {product?.images?.map((img) => (
            <div key={img?.public_id} className="col-2 ms-4 mt-2">
              <button
                role="button"
                className="btn p-0 border-0"
                // On click, update the active image state with the thumbnail's URL
                onClick={() => setActiveImg(img.url)}
              >
                <img
                  className={`d-block border rounded p-2 cursor-pointer ${img.url === activeImg ? 'border-primary' : ''}`}
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={product?.name}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # {product?._id}</p>

        <hr />

        <div className="d-flex">
          <StarRatings
            rating={product?.ratings || 0}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            starDimension="22px"
            starSpacing="1px"
          />
          <span id="no-of-reviews" className="pt-1 ps-2">
            ({product?.numOfReviews} Reviews)
          </span>
        </div>
        <hr />

        <p id="product_price">${product?.price?.toFixed(2)}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            defaultValue="1"
            readOnly
          />
          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product?.stock === 0}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? "greenColor" : "redColor"}
          >
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        <div className="alert alert-danger my-5" role="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;