import React, { useEffect, useMemo } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import MetaData from "../layout/MetaData";

// Import the query from your newly created orders API slice:
import { useGetAdminOrdersQuery, useDeleteOrderMutation } from "../../redux/api/orderApi";
import AdminLayout from "../layout/AdminLayout";

const ListOrders = () => {
    const { data, isLoading, error } = useGetAdminOrdersQuery();

    const [deleteOrder, { error: deleteError, isSuccess }] = useDeleteOrderMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "An error occurred");
        }
        if (deleteError) {
            toast.error(deleteError?.data?.message || "Failed to delete order");
        }

        if (isSuccess) {
            toast.success("Order deleted successfully");
        }
    }, [error, deleteError, isSuccess]);

    const deleteOrderHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            deleteOrder(id);
        }
    };

    const ordersData = useMemo(() => {
        const dataTable = {
            columns: [
                { label: "ID", field: "id", sort: "asc" },
                { label: "Payment Status", field: "paymentStatus", sort: "asc" },
                { label: "Order Status", field: "orderStatus", sort: "asc" },
                { label: "Actions", field: "actions", sort: "asc" },
            ],
            rows: [],
        };

        data?.orders?.forEach((order) => {
            dataTable.rows.push({
                id: order?._id,
                paymentStatus: order?.paymentInfo?.status?.toUpperCase() || "Not Paid",
                orderStatus: order?.orderStatus?.toUpperCase() || "Pending",
                actions: (
                    <>
                        <Link to={`/admin/orders/${order?._id}`} className="btn btn-outline-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteOrderHandler(order?._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        return dataTable;
    }, [data]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <MetaData title={'All Orders'} />
            <AdminLayout>
                <h1 className="my-5">{data?.orders?.length} Orders</h1>

                <MDBDataTable
                    data={ordersData}
                    className="px-3"
                    bordered
                    striped
                    hover
                />

            </AdminLayout>
        </>
    );
};

export default ListOrders;
