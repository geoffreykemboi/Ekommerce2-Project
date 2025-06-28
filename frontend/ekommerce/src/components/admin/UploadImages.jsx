// frontend/src/components/admin/UploadImages.jsx (The Absolute Final Version for Tonight)

import React, { useState, useEffect, useRef } from "react"; // 1. Import useRef
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import {
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";

const UploadImages = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // 2. Create the ref

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { data: productData } = useGetProductDetailsQuery(params?.id);
  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();

  useEffect(() => {
    if (productData?.product) {
      setUploadedImages(productData.product.images);
    }
    if (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
    if (isSuccess) {
      setImagesPreview([]);
      toast.success("Images uploaded successfully");
      navigate("/admin/products");
    }
  }, [productData, error, isSuccess, navigate]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadProductImages({ id: params?.id, body: { images } });
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img !== image);
    const filteredImages = images.filter((img) => img !== image);
    setImagesPreview(filteredImagesPreview);
    setImages(filteredImages);
  };

  // 3. Add your handler function
  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <AdminLayout>
      <MetaData title={"Upload Product Images"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Upload Product Images</h2>
            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Choose Images
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  onChange={onChange}
                  multiple
                  ref={fileInputRef} // 4. Attach the ref and onClick handler
                  onClick={handleResetFileInput}
                />
              </div>

              {imagesPreview.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images to Upload:</p>
                  <div className="row mt-4">
                    {imagesPreview.map((img, index) => (
                      <div className="col-md-3 mt-2" key={index}>
                        <div className="card">
                          <img
                            src={img}
                            alt="New Image Preview"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px", objectFit: 'contain' }}
                          />
                          <button
                            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDelete(img)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedImages.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product's Current Images:</p>
                  <div className="row mt-1">
                    {uploadedImages.map((img) => (
                      <div className="col-md-3 mt-2" key={img?.public_id}>
                        <div className="card">
                          <img
                            src={img?.url}
                            alt="Uploaded Product"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px", objectFit: 'contain' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading || images.length === 0}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;