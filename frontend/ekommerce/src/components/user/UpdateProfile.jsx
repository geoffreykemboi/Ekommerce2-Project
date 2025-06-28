import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import UserLayout from "./UserLayout";

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading, error, isSuccess, data }] = useUpdateProfileMutation();

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    useEffect(() => {
        if (error) {
            const message = error?.data?.message || "Failed to update profile";
            toast.error(message);
            console.error("Update Error:", error);
        }

        if (isSuccess && data?.user) {
            toast.success("User Updated");
            navigate("/me/profile");
        }
    }, [error, isSuccess, data, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
        };

        updateProfile(userData);
    };

    return (
        <UserLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Update Profile</h2>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
};

export default UpdateProfile;
