import React from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";

const Home = () => {
  const { data, isloading } = useGetProductsQuery();

  console.log("Data:", data);
  console.log("Loading:", isloading);

  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">Latest Products</h1>

          <section id="products" className="mt-5">
            <div className="row">
              {isloading ? (
                <p>Loading products...</p>
              ) : data?.products?.length ? (
                data.products.map((product) => <ProductItem key={product.id} product={product} />)
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
