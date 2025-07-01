import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch } from 'react-redux';
import { setCartItem } from '../../redux/features/cartSlice';
import { formatPrice } from "../../helpers/helpers";

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState("");

    const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);
    const product = data?.product;

    useEffect(() => {
        if (product?.images?.length > 0) {
            setActiveImg(product.images[0].url);
        }
    }, [product]);

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message);
        }
    }, [isError, error]);

    // REFACTORED: Quantity logic now uses state directly, not the DOM.
    const increaseQty = () => {
        if (quantity >= product.stock) return;
        setQuantity((prev) => prev + 1);
    };

    const decreaseQty = () => {
        if (quantity <= 1) return;
        setQuantity((prev) => prev - 1);
    };

    const setItemToCart = () => {
      const cartItem = {
        product: product?._id,
        name: product?.name,
        price: product?.price,
        image: product?.images[0]?.url,
        stock: product?.stock,
        quantity
      };

      dispatch(setCartItem(cartItem));
    };

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !product) {
        return <div className="alert alert-danger">Product not found.</div>;
    }

    return (
        <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <div className="p-3">
                    <img
                        className="d-block w-100"
                        src={activeImg || '/images/default_product.png'}
                        alt={product?.name}
                        width="340"
                        height="390"
                    />
                </div>
                <div className="row justify-content-start mt-5">
                    {product?.images?.map((img) => (
                        <div key={img?.public_id} className="col-2 ms-4 mt-2">
                            <button
                                className="btn p-0 border-0"
                                onClick={() => setActiveImg(img.url)}
                            >
                                <img
                                    className={`d-block border rounded p-2 cursor-pointer ${
                                        img.url === activeImg ? "border-primary" : ""
                                    }`}
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

                <p id="product_price">{formatPrice(product?.price)}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                    <input
                        type="number"
                        className="form-control count d-inline"
                        // FIX: Changed to a controlled component using 'value' instead of 'defaultValue'.
                        value={quantity}
                        readOnly
                    />
                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                <button
                    type="button"
                    id="cart_btn"
                    className="btn btn-primary d-inline ms-4"
                    disabled={product?.stock === 0}
                    onClick={setItemToCart}
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