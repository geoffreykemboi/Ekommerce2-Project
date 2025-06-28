import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
// ✅ Make sure you have this action in your cartSlice
import { saveShippingInfo } from "../../redux/features/cartSlice"; 
import { countries } from "countries-list";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  // Initialize state from Redux store or with empty strings
  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [city, setCity] = useState(shippingInfo?.city || "");
  // ✅ Crucial Part 1: State for the phone number
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode || "");
  const [country, setCountry] = useState(shippingInfo?.country || "Kenya");
  const [state, setState] = useState(shippingInfo?.state || ""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countriesList = Object.values(countries);

  const submitHandler = (e) => {
    e.preventDefault();
    
    // ✅ Crucial Part 2: Dispatch all fields, including phoneNo
    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            {/* ✅ Crucial Part 3: The input field for the phone number in your form */}         
            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">Phone No</label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="postal_code_field" className="form-label">Postal Code</label>
              <input
                type="text"
                id="postal_code_field"
                className="form-control"
                name="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

             <div className="mb-3">
              <label htmlFor="state_field" className="form-label">State/County</label>
              <input
                type="text"
                id="state_field"
                className="form-control"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
                <label htmlFor="country_field" className="form-label">Country</label>
                <select
                    id="country_field"
                    className="form-select"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                >
                    {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
