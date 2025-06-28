import React from "react";
import { useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./invoice.css"; // CSS styles for invoice

const Invoice = () => {
  // This variable is now used for fetching data (as intended) or can be displayed.
  const { _Id:orderId } = useParams();

  // You can fetch the order using orderId here.
  // This comment is a good practice to indicate future implementation.
  // e.g. const { data: order, isLoading } = useOrderDetailsQuery(orderId);

  // This function will now be attached to the button's onClick event.
  const handlePrint = () => {
    // We hide the button before printing for a cleaner output.
    const printButton = document.querySelector(".btn-success");
    printButton.style.display = "none";

    window.print();

    // We restore the button after the print dialog is closed.
    printButton.style.display = "block";
  };

  return (
    <>
      {/* It's good practice to use the dynamic orderId in the title */}
      <MetaData title={`Invoice for Order #${orderId}`} />

      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          {/*
           * FIXED: The 'handlePrint' function is now attached to this button's onClick event.
           * This resolves the 'no-unused-vars' warning for handlePrint.
           */}
          <button className="btn btn-success col-md-5" onClick={handlePrint}>
            <i className="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <div id="logo">
              <img src="../images/invoice-logo.png" alt="Company Logo" />
            </div>
            {/*
             * FIXED: The 'orderId' from the URL is now displayed in the invoice header.
             * This resolves the 'no-unused-vars' warning for orderId.
             */}
            <h1>INVOICE # {orderId}</h1>
            <div id="company" className="clearfix">
              <div>ShopIT</div>
              <div>
                455 Foggy Heights,
                <br />
                AZ 85004, US
              </div>
              <div>(602) 519-0450</div>
              <div>
                <a href="mailto:info@shopit.com">info@shopit.com</a>
              </div>
            </div>
            {/*
             * NOTE: This section should be populated with dynamic data from the fetched order
             * using the 'orderId'. For now, the static data remains.
             */}
            <div id="project">
              <div><span>Name</span> John Doe</div>
              <div><span>EMAIL</span> john.doe@example.com</div>
              <div><span>PHONE</span> 123-456-7890</div>
              <div>
                <span>ADDRESS</span> 123 Main St, Cityville, 12345, Country
              </div>
              <div><span>DATE</span> 2023-09-19</div>
              <div><span>Status</span> Paid</div>
            </div>
          </header>
          <main>
            {/* ... rest of your static JSX remains the same ... */}
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="service">1</td>
                  <td className="desc">Product 1</td>
                  <td className="unit">$499.99</td>
                  <td className="qty">3</td>
                  <td className="total">$1499.97</td>
                </tr>
                <tr>
                  <td className="service">2</td>
                  <td className="desc">Product 2</td>
                  <td className="unit">$399.99</td>
                  <td className="qty">2</td>
                  <td className="total">$799.98</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>SUBTOTAL</b>
                  </td>
                  <td className="total">$2299.95</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>TAX 15%</b>
                  </td>
                  <td className="total">$344.99</td>
                </tr>

                <tr>
                  <td colSpan="4">
                    <b>SHIPPING</b>
                  </td>
                  <td className="total">$10.00</td>
                </tr>

                <tr>
                  <td colSpan="4" className="grand total">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="grand total">$2654.94</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>NOTICE:</div>
              <div className="notice">
                A finance charge of 1.5% will be made on unpaid balances after 30
                days.
              </div>
            </div>
          </main>
          <footer>
            Invoice was created on a computer and is valid without the signature.
          </footer>
        </div>
      </div>
    </>
  );
};

export default Invoice;