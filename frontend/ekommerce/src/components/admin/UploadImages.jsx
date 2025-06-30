// frontend/src/components/admin/UploadImages.jsx (Regenerated and Corrected)

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import {
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation, // 1. IMPORT the delete hook
} from "../../redux/api/productsApi";

const UploadImages = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const { data: productData } = useGetProductDetailsQuery(params?.id);

  const [uploadProductImages, { isLoading, error: uploadError, isSuccess: isUploadSuccess }] =
    useUploadProductImagesMutation();

  // 2. INITIALIZE the delete hook with clear variable names
  const [deleteProductImage, { isLoading: isDeleting, error: deleteError, isSuccess: isDeleteSuccess }] =
    useDeleteProductImageMutation();

  // Effect for setting initial images and handling delete success
  useEffect(() => {
    if (productData?.product) {
      setUploadedImages(productData.product.images);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message || "Failed to delete image");
    }
    if (isDeleteSuccess) {
      toast.success("Image Deleted");
    }
  }, [productData, deleteError, isDeleteSuccess]);

  // Effect for handling upload success/error
  useEffect(() => {
    if (uploadError) {
      toast.error(uploadError?.data?.message || "Upload failed");
    }
    if (isUploadSuccess) {
      setImagesPreview([]);
      toast.success("Images uploaded successfully");
      navigate("/admin/products");
    }
  }, [uploadError, isUploadSuccess, navigate]);

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

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  // 3. ADD a handler function to call the delete mutation
  const handleDeleteImage = (imgId) => {
    deleteProductImage({ id: params?.id, body: { imgId } });
  };

  return (
    <AdminLayout>
      <MetaData title={"Upload Product Images"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Upload Product Images</h2>
            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">Choose Images</label>
              <div className="custom-file">
                <input type="file" name="product_images" className="form-control" id="customFile" onChange={onChange} multiple ref={fileInputRef} onClick={handleResetFileInput} />
              </div>

              {imagesPreview.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images to Upload:</p>
                  <div className="row mt-4">
                    {imagesPreview.map((img, index) => (
                      <div className="col-md-3 mt-2" key={index}>
                        <div className="card">
                          <img src={img} alt="New Preview" className="card-img-top p-2" style={{ width: "100%", height: "80px", objectFit: 'contain' }} />
                          <button style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }} type="button" className="btn btn-block btn-danger cross-button mt-1 py-0" onClick={() => handleImagePreviewDelete(img)}>
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedImages?.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product's Current Images:</p>
                  <div className="row mt-1">
                    {uploadedImages.map((img) => (
                      <div className="col-md-3 mt-2" key={img?.public_id}>
                        <div className="card">
                          <img src={img?.url} alt="Uploaded" className="card-img-top p-2" style={{ width: "100%", height: "80px", objectFit: 'contain' }} />
                          {/* 4. ADD the delete button to each existing image */}
                          <button style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }} className="btn btn-block btn-danger cross-button mt-1 py-0" type="button" disabled={isDeleting} onClick={() => handleDeleteImage(img?.public_id)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button type="submit" className="btn w-100 py-2" disabled={isLoading || isDeleting || images.length === 0}>
              {isLoading ? "UPLOADING..." : "UPLOAD"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;