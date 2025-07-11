import React from "react";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from '../../redux/api/authApi';
import { toast } from "react-hot-toast";


const Header = () => {

    const navigate = useNavigate()

    // Only fetch user data if there's a token in localStorage
    const token = localStorage.getItem("token");
    const { isLoading} = useGetMeQuery(undefined, {
        skip: !token // Skip the query if no token is present
    });

    const { user } = useSelector ((state) => state.auth);
    const { cartItems } = useSelector ((state) => state.cart)

    const [triggerLogout] = useLogoutMutation();

const logoutHandler = async () => {
    try {
        toast.loading("Signing you out...", { id: "logout-loading" });
        await triggerLogout(); // Triggers the logout query
        toast.dismiss("logout-loading");
        navigate(0); // Refresh the page
    } catch (err) {
        toast.dismiss("logout-loading");
        toast.error("Logout failed. Please try again.");
        console.error("Logout failed", err);
    }
}

    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3 ps-5">
                <div className="navbar-brand">
                    <a href="/">
                        <img src="../images/ekommerce_logo.jpeg" className="logo"  alt="Ekommerce Logo" />
                    </a>
                </div>
            </div>
            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <a href="/cart" style={{ textDecoration: "none" }}>
                    <span id="cart" className="ms-3"> Cart </span>
                    <span className="ms-1" id="cart_count">{cartItems?.length}</span>
                </a>

                {user ? (
                    <div className="ms-4 dropdown">
                        <button
                            className="btn dropdown-toggle text-white"
                            type="button"
                            id="dropDownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <figure className="avatar avatar-nav">
                                <img
                                    src={user?.avatar ? user?.avatar.url 
                                    : "/images/default_avatar.jpg"}
                                    alt="User Avatar"
                                    className="rounded-circle" />
                            </figure>
                            <span>{user?.name}</span>
                        </button>
                        <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
                           {user?.role === "admin" && (
                          <Link className="dropdown-item" to="/admin/dashboard">
                            {" "}
                            Dashboard{""} 
                            </Link>
                           )}
                            <Link className="dropdown-item" to="/me/orders"> Orders </Link>
                            <Link className="dropdown-item" to="/me/profile"> Profile </Link>
                            <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                             Logout 
                             </Link>
                        </div>
                    </div>
                ) : (
                    !isLoading && (
                        <Link to="/login" className="btn ms-4" id="login_btn">
                            Login
                        </Link>
                    )
                )}
                </div>
        </nav>
    );
};

export default Header;
