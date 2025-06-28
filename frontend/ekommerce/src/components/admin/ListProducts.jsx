import React, { useEffect, useMemo, useCallback } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import MetaData from "../layout/MetaData";

// 👇 It can now successfully import both the query and the mutation
import { 
    useGetAdminProductsQuery,
    useDeleteProductMutation 
} from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";

const ListProducts = () => {
    const { data, isLoading, error } = useGetAdminProductsQuery();

    const [
        deleteProduct, 
        { isLoading: isDeleteLoading, error: deleteError, isSuccess }
    ] = useDeleteProductMutation();

    useEffect(() => {
        // Handles error from fetching products
        if (error) {
            toast.error(error?.data?.message || "An error occurred");            
        }
        
        // Handles error from deleting a product
        if (deleteError) {
            toast.error(deleteError?.data?.message || "Failed to delete product");
        }

        // Shows a success message after a product is deleted
        if (isSuccess) {
            toast.success("Product Deleted");
            // The list will refresh automatically because of the tags we set up
        }
    }, [error, deleteError, isSuccess]);

    // We wrap this function in useCallback so it doesn't get re-created on every render
    const deleteProductHandler = useCallback((id) => {
        deleteProduct(id);
    }, [deleteProduct]);

    // We use useMemo to prevent re-calculating the table data on every render
    const productsData = useMemo(() => {
        const dataTable = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Stock",
                    field: "stock",
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

        data?.products?.forEach((product) => {
            dataTable.rows.push({
                id: product?._id,
                name: `${product?.name?.substring(0, 20)}...`,
                stock: product?.stock,
                actions: (
                    <>
                        <Link to={`/admin/product/${product?._id}`} className="btn btn-outline-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link to={`/admin/products/${product?._id}/upload_images`} className="btn btn-outline-success ms-2">
                            <i className="fa fa-image"></i>
                        </Link>
                        <button 
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteProductHandler(product?._id)}
                            disabled={isDeleteLoading} // Button is disabled while deleting
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });

        return dataTable;
    }, [data, isDeleteLoading, deleteProductHandler]);

    if (isLoading) { 
        return <Loader />;
    }

    return (
        <>
            <MetaData title={'All Products'} />
            <AdminLayout>
                <h1 className="my-5">{data?.products?.length} Products</h1>

                <MDBDataTable
                    data={productsData}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </AdminLayout>
        </>
    );
};

export default ListProducts;