import React from "react";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";
import { formatPrice } from "../../helpers/helpers";
import { toast } from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?._id || item?.product, // Ensure ID is stored
      name: item?.name,
      price: item?.price,
      image:
        typeof item?.image === "string"
          ? item.image
          : item?.image?.url || item?.images?.[0]?.url || "", // Get correct image
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };

  const increaseQty = (item, quantity) => {
    const newQty = quantity + 1;
    if (newQty > item?.stock) return;
    setItemToCart(item, newQty);
  };

  const decreaseQty = (item, quantity) => {
    if (quantity <= 1) return;
    const newQty = quantity - 1;
    setItemToCart(item, newQty);
  };

  const removeCartItemHandler = (id, itemName) => {
    if (window.confirm(`Are you sure you want to remove "${itemName}" from your cart?`)) {
      dispatch(removeCartItem(id));
      toast.success("Item removed from cart successfully!");
    }
  };

  const clearCartHandler = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      cartItems.forEach(item => {
        dispatch(removeCartItem(item.product));
      });
      toast.success("Cart cleared successfully!");
    }
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <MetaData title={"Your Cart"} />

      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Your Cart is Empty</h2>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
            <h2>
              Your Cart: <b>{cartItems?.length} items</b>
            </h2>
            {cartItems?.length > 0 && (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={clearCartHandler}
                title="Clear entire cart"
              >
                <i className="fa fa-trash-o me-1"></i>
                Clear Cart
              </button>
            )}
          </div>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems?.map((item) => (
                <React.Fragment key={item.product}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item?.product}`}>
                          {item?.name}
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{formatPrice(item?.price)}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decreaseQty(item, item.quantity)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item?.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() => increaseQty(item, item.quantity)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm delete-cart-item"
                          onClick={() => removeCartItemHandler(item.product, item.name)}
                          title="Remove item from cart"
                          aria-label="Remove item from cart"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Units:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)} (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    {formatPrice(cartItems
                      .reduce((acc, item) => acc + item.price * item.quantity, 0))}
                  </span>
                </p>
                <hr />
                <button id="checkout_btn" className="btn btn-primary w-100"onClick={checkoutHandler}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
