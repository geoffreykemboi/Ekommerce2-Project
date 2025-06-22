// src/components/Home.jsx

import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";

const Home = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings =searchParams.get("ratings");

  // Construct API query params
  const params = { page, keyword };
  if (min) params.min = min;
  if (max) params.max = max;
  if (category) params.category = category;
  if (ratings) params.ratings = ratings;


  const { data, isLoading, error } = useGetProductsQuery(params);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to load products");
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title="Buy Best Products Online" />

      <div className="container mt-4">
        <h1 className="text-secondary mb-4">
          {keyword
            ? `${data?.products?.length} Products found with keyword: ${keyword}`
            : "Latest Products"}
        </h1>

        <div className="row">
          {/* Left column for filters */}
          <div className="col-md-3 mb-4">
            <Filters />
          </div>

          {/* Right column for products */}
          <div className="col-md-9">
            <section id="products">
              <div className="row">
                {data?.products?.length > 0 ? (
                  data.products.map((product) => (
                    <ProductItem
                      key={product._id || product.id}
                      product={product}
                    />
                  ))
                ) : (
                  <p className="text-center">No products available.</p>
                )}
              </div>
            </section>

            <CustomPagination
              resPerPage={data?.resPerPage}
              filteredProductsCount={data?.filteredProductsCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
