import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import Loader from "../layout/Loader";
import { useOrderDetailsQuery, useUpdateOrderMutation } from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import { formatPrice } from "../../helpers/helpers";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();
  const {
    data,
    isLoading: loadingOrder,
    error,
    refetch,
  } = useOrderDetailsQuery(params?.id);

  const order = data?.order || {};

  const [
    updateOrder,
    { isLoading: updating, error: updateError, isSuccess },
  ] = useUpdateOrderMutation();

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "paid";

  useEffect(() => {
    if(orderStatus) {
      setStatus(orderStatus);
    }
    }, [orderStatus]);
    
  useEffect(() => {

    if (error) {
      toast.error(error?.data?.message);
    }

    if (updateError) {
      toast.error(updateError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Order updated successfully");
      refetch();
    }
  }, [error, updateError, isSuccess, refetch]);

  const updateOrderHandler = async (id) => {
    if (!status) {
      toast.error("Please select a status.");
      return;
    }

    try {
      await updateOrder({ id, body: { status } });
    } catch (err) {
      console.error(err);
    }
  };

  if (loadingOrder || updating) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title="Process Order" />

      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Order Details</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Order Status</th>
                <td
                  className={isPaid ? "greenColor" : "redColor"}
                >
                  <b>{orderStatus || "Unknown"}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Phone No</th>
                <td>{shippingInfo?.phoneNo}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>
                  {`${shippingInfo?.address || ""}, ${shippingInfo?.city || ""}`}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Payment Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td className={isPaid ? "greenColor" : "redColor"}>
                  <b>{paymentInfo?.status || "Not Paid"}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{paymentInfo?.method || "N/A"}</td>
              </tr>
              <tr>
                <th scope="row">Stripe ID</th>
                <td>{paymentInfo?.id || "Nill"}</td>
              </tr>
              <tr>
                <th scope="row">Amount Paid</th>
                <td>${totalAmount?.toFixed(2) || "0.00"}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Order Items:</h3>

          <hr />
          {orderItems?.map((item) => (
            <div className="cart-item my-1" key={item._id}>
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={item?.image || "/images/default_product.png"}
                    alt={item?.name}
                    height="45"
                    width="65"
                  />
                </div>
                <div className="col-5 col-lg-5">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>{formatPrice(item.price)}</p>
                </div>
                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>{item.quantity} Piece(s)</p>
                </div>
              </div>
            </div>
          ))}
          <hr />
        </div>

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Status</h4>

          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={() => updateOrderHandler(order?._id)}
          >
            Update Status
          </button>

          <h4 className="mt-5 mb-3">Order Invoice</h4>
          <Link
            to={`/invoice/order/${order?._id}`}
            className="btn btn-success w-100"
          >
            <i className="fa fa-print"></i> Generate Invoice
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
