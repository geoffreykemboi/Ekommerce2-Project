import React, { useEffect, useMemo } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import MetaData from "../layout/MetaData";

// Import the query from your newly created users API slice:
import { useGetAdminUsersQuery, useDeleteUserMutation } from "../../redux/api/userApi";
import AdminLayout from "../layout/AdminLayout";

const ListUsers = () => {
    const { data, isLoading, error } = useGetAdminUsersQuery();

    const [deleteUser, { error: deleteError, isSuccess }] = useDeleteUserMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "An error occurred");
        }
        if (deleteError) {
            toast.error(deleteError?.data?.message || "Failed to delete user");
        }

        if (isSuccess) {
            toast.success("User deleted successfully");
        }
    }, [error, deleteError, isSuccess]);

    const deleteUserHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(id);
        }
    };

    const usersData = useMemo(() => {
        const dataTable = {
            columns: [
                { label: "ID", field: "id", sort: "asc" },
                { label: "Name", field: "name", sort: "asc" },
                { label: "Email", field: "email", sort: "asc" },
                { label: "Role", field: "role", sort: "asc" },
                { label: "Actions", field: "actions", sort: "asc" },
            ],
            rows: [],
        };

        data?.users?.forEach((user) => {
            dataTable.rows.push({
                id: user?._id,
                name: user?.name,
                email: user?.email,
                role: user?.role?.toUpperCase() || "USER",
                actions: (
                    <>
                        <Link to={`/admin/users/${user?._id}`} className="btn btn-outline-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-outline-danger ms-2"
                            onClick={() => deleteUserHandler(user?._id)}
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
            <MetaData title={'All Users'} />
            <AdminLayout>
                <h1 className="my-5">{data?.users?.length} Users</h1>

                <MDBDataTable
                    data={usersData}
                    className="px-3"
                    bordered
                    striped
                    hover
                />

            </AdminLayout>
        </>
    );
};

export default ListUsers;
