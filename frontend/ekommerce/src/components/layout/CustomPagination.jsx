import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = Number(searchParams.get('page')) || 1;

    const setCurrentPageNo = (pageNumber) => {
        const params = new URLSearchParams(window.location.search);

        if (pageNumber) {
            params.set("page", pageNumber);
        } else {
            params.delete("page");
        }
        
        const path = window.location.pathname + "?" + params.toString();
        navigate(path);
    };

    return (
        <div className="d-flex justify-content-center my-5">
            {filteredProductsCount > resPerPage && (
                <Pagination
                    activePage={page}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={filteredProductsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            )}
        </div>
    );
};

export default CustomPagination;