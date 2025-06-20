// src/components/Home.jsx

import React, { useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from 'react-hot-toast'
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";

const Home = () => {

  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";

  const params = { page, keyword };


  const { data, isLoading, error } = useGetProductsQuery(params);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  console.log("Data:", data);
  console.log("Error:", error);
  console.log("Loading:", isLoading);

  if(isLoading) return <Loader/>

  return (
    <>
      <MetaData title="Buy Best Products Online" />

      <div className="container mt-4">
        <h1 className="text-center text-secondary mb-4">
          {keyword ? `${data?.products?.length} Products found with keyword: ${keyword}` : "Latest Products"}
          </h1>

        <section id="products">
          <div className="row">
            {isLoading ? (
              <p className="text-center">Loading products...</p>
            ) : error ? (
              <p className="text-danger text-center">
                Failed to load products. {error?.data?.message || ""}
              </p>
            ) : data?.products?.length > 0 ? (
              data.products.map((product) => (
                <ProductItem key={product._id || product.id} product={product} />
              ))
            ) : (
              <p className="text-center">No products available.</p>
            )}
          </div>        
        </section>

              <CustomPagination
        resPerPage={data?.resPerPage}
        filteredProductsCount={data?.filteredProductsCount} />

      </div>
    </>
  );
};

export default Home;
