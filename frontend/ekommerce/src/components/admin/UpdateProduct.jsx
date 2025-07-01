// frontend/src/admin/UpdateProduct.js (Corrected and Final Version)

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // <-- 1. IMPORT useParams
import { toast } from "react-hot-toast";

import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import {
  useUpdateProductMutation, // <-- 2. IMPORT the correct update hook
  useGetProductDetailsQuery,
} from "../../redux/api/productsApi";
import { PRODUCT_CATEGORIES } from "../../constants/constants";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams(); // <-- 3. CALL useParams to get the ID

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
  });

  // Get the product details query
  const { data } = useGetProductDetailsQuery(params?.id);

  // Get the update mutation hook
  // Renamed to lowercase 'updateProduct' to avoid conflicts
  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();

  // EFFECT 1: Populate the form when data is fetched
  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        category: data.product.category,
        stock: data.product.stock,
        seller: data.product.seller,
      });
    }
  }, [data]);

  // EFFECT 2: Handle the result of the update mutation
  useEffect(() => {
    if (error) {
      // Use the 'error' from the mutation hook
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product updated successfully");
      navigate("/admin/products");
    }
  }, [error, isSuccess, data, navigate]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct({ id: params?.id, body: product });
  };

  return (
    <AdminLayout>
      <MetaData title={"Update Product"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Update Product</h2>
            
            {/* Form inputs are maintained as you wrote them, they were correct */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">Name</label>
              <input type="text" id="name_field" className="form-control" name="name" value={product.name} onChange={onChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="description_field" className="form-label">Description</label>
              <textarea className="form-control" id="description_field" rows="8" name="description" value={product.description} onChange={onChange}></textarea>
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">Price (KSH)</label>
                <input type="text" id="price_field" className="form-control" name="price" value={product.price} onChange={onChange} />
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">Stock</label>
                <input type="number" id="stock_field" className="form-control" name="stock" value={product.stock} onChange={onChange} />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="category_field" className="form-label">Category</label>
              <select className="form-select" id="category_field" name="category" value={product.category} onChange={onChange}>
                {PRODUCT_CATEGORIES?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="seller_field" className="form-label">Seller Name</label>
              <input type="text" id="seller_field" className="form-control" name="seller" value={product.seller} onChange={onChange} />
            </div>

            <button type="submit" className="btn w-100 py-2" disabled={isLoading}>
              {isLoading ? "Updating..." : "UPDATE"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;