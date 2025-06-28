import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { calculateOrderCost } from "../../helpers/helpers";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [createNewOrder, { isLoading, error, isSuccess }] = useCreateNewOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!method) {
      toast.error("Please select a payment method");
      return;
    }
    
    // ✅ FIX: Handle the Mpesa case first and exit the function.
    if (method === "Mpesa") {
      toast.error("Mpesa Payment integration is coming soon.");
      return; // Stop execution here
    }

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculateOrderCost(cartItems);

    // ✅ FIX: The property names now exactly match your backend controller/schema.
    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      itemPrice: itemsPrice,
      shippingAmount: shippingPrice,
      taxAmount: taxPrice,
      totalAmount: totalPrice,
      paymentInfo: {
        status: "Not Paid",
      },
      // ✅ FIX: Use the 'method' from state instead of hardcoding "COD".
      paymentMethod: method,
    };

    createNewOrder(orderData);
  };

  return (
    <>
      <MetaData title={"Payment Method"} />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                // ✅ FIX: Use e.target.value for a standard and robust approach.
                onChange={(e) => setMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="mpesaradio"
                value="Mpesa"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="mpesaradio">
                Mpesa Payment
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn py-2 w-100"
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "CONTINUE"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
