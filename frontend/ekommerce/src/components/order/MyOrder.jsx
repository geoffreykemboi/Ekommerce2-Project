import React, { useEffect } from "react";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from 'mdbreact';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import MetaData from "../layout/MetaData";
import { clearCart } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { formatPrice } from "../../helpers/helpers";

const MyOrders = () => {
    const { data, isLoading, error } = useMyOrdersQuery();

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderSuccess = searchParams.get("order_success");

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);            
        }
        if (orderSuccess) {
            dispatch(clearCart());
            navigate("/me/orders");
        }
    }, [error, orderSuccess, dispatch, navigate]); // ✅ Added missing dependencies

    const setOrders = () => {
        const tableData = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Amount Paid",
                    field: "amount",
                    sort: "asc",
                },
                {
                    label: "Payment Status",
                    field: "paymentStatus",
                    sort: "asc",
                },
                {
                    label: "Order Status",
                    field: "orderStatus",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },
            ],
            rows: [],
        };

        data?.orders?.forEach((order) => {
            tableData.rows.push({
                id: order?._id,
                amount: formatPrice(order?.totalAmount),
                paymentStatus: (
                    <p style={{ color: String(order?.paymentInfo?.status).includes("Paid") ? "green" : "red" }}>
                        <b>{order?.paymentInfo?.status}</b>
                    </p>
                ),
                orderStatus: (
                    <p style={{ color: String(order?.orderStatus).includes("Delivered") ? "green" : "red" }}>
                        <b>{order?.orderStatus}</b>
                    </p>
                ),
                actions: (
                    <Link to={`/me/order/${order?._id}`} className="btn btn-primary">
                        View
                    </Link>
                ),
            });
        });

        return tableData;
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <MetaData title={'My Orders'} />
            <div>
                <h1 className="my-5">{data?.orders?.length} Orders</h1>

                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </div>
        </>
    );
};

export default MyOrders;
