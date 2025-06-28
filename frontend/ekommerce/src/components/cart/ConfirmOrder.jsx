import React from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Calculate prices
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 100; // Free shipping if subtotal > 1000 KES
  const tax = Number((0.1 * subtotal).toFixed(2)); // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p><b>Name:</b> {user?.name}</p>
          <p><b>Phone:</b> {shippingInfo?.phoneNo}</p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.postalCode}, {shippingInfo?.country}
          </p>

          <h4 className="mt-4">Your Cart Items:</h4>
          <hr />
          {cartItems?.map((item) => (
            <div className="cart-item my-1" key={item.product}>
              <div className="row">
                <div className="col-4 col-lg-2">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    height="45"
                    width="65"
                  />
                </div>

                <div className="col-5 col-lg-6">
                  <Link to={`/product/${item.product}`}>{item?.name}</Link>
                </div>

                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                  <p>
                    {item?.quantity} x KES {item?.price} ={" "}
                    <b>KES {(item?.quantity * item?.price).toFixed(2)}</b>
                  </p>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">
                KES {subtotal.toFixed(0)}
              </span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">
                KES {shipping.toFixed(0)}
              </span>
            </p>
            <p>
              Tax:{" "}
              <span className="order-summary-values">
                KES {tax.toFixed(0)}
              </span>
            </p>
            <hr />
            <p>
              Total:{" "}
              <span className="order-summary-values">
                KES {total.toFixed(0)}
              </span>
            </p>
            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
