import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useParams, Link } from "react-router-dom";
// ✅ FIX: Corrected the imported hook name to match what is exported from your API slice.
import { useOrderDetailsQuery } from "../../redux/api/orderApi"; 
import Loader from "../layout/Loader";
import toast from "react-hot-toast";

const OrderDetails = () => {
    const params = useParams();
    // ✅ FIX: Used the correct hook name here.
    const { data, isLoading, error} = useOrderDetailsQuery(params?.id);
    const order = data?.order || {};

    // Destructure all necessary fields from the order object
    const { 
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        user, 
        totalAmount, // Corrected from totalPrice
        orderStatus,
        _id,
        createdAt
    } = order;

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [error]);

    const isPaid = paymentInfo?.status === 'Paid';

    if (isLoading) return <Loader/>;
    
    return (
    <>
    <MetaData title={'Order Details'} />
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-lg-9 mt-5 order-details">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mt-5 mb-4">Your Order Details</h3>
          {/* Dynamically set the invoice link */}
          <a className="btn btn-success" href={`/invoice/order/${_id}`}>
            <i className="fa fa-print"></i> Invoice
          </a>
        </div>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{_id}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td className={String(orderStatus).includes("Delivered") ? "greenColor" : "redColor"}>
                <b>{orderStatus}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Date</th>
              <td>{new Date(createdAt).toLocaleString("en-US")}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Shipping Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              {/* Use dynamic user name */}
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              {/* Use dynamic phone number */}
              <td>{shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              {/* Use dynamic address details */}
              <td>{shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.state},{shippingInfo?.postalCode}, {shippingInfo?.country}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Payment Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td className={isPaid ? "greenColor" : "redColor"}>
                {/* Use dynamic payment status */}
                <b>{paymentInfo?.status}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              {/* Use dynamic payment method */}
              <td>{order?.paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Stripe ID</th>
              {/* Use dynamic Stripe ID */}
              <td>{paymentInfo?.id || "Nill"}</td>
            </tr>
            <tr>
              <th scope="row">Amount Paid</th>
              {/* Use dynamic total amount */}
              <td>${totalAmount?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 my-4">Order Items:</h3>

        <hr />
        {/* Map over orderItems to display each one dynamically */}
        {orderItems?.map((item) => (
            <div key={item.product} className="cart-item my-1">
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    height="45"
                    width="65"
                  />
                </div>
    
                <div className="col-5 col-lg-5">
                  <Link to={`/products/${item?.product}`}>{item?.name}</Link>
                </div>
    
                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>${item?.price.toFixed(2)}</p>
                </div>
    
                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{item?.quantity} Piece(s)</p>
                </div>
              </div>
            </div>
        ))}
        <hr />
      </div>
    </div>
    </>
    )
}

export default OrderDetails;
