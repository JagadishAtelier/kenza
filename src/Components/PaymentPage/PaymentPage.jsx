// Updated PaymentPage.jsx (UX improved, design untouched)
import React, { useState } from "react";
import "./PaymentPage.css";
import { createOrder } from "../../Api/orderApi";
import { createCustomerAddress } from "../../Api/customerAddressApi";
import { useCart } from "../CartContext/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import TPImage1 from "../../Assets/p1.webp";
import TPImage2 from "../../Assets/p2.webp";
import TPImage3 from "../../Assets/p3.webp";
import TPImage4 from "../../Assets/p4.webp";
import TPImage5 from "../../Assets/p5.webp";
import TPImage6 from "../../Assets/p6.webp";
import TPImage7 from "../../Assets/p1.webp";
import TPImage8 from "../../Assets/p8.webp";
import { Plus, PlusSquare } from "lucide-react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const source = location.state?.source || "cart";
  const productFromState = location.state?.product;
  const { cartItems, clearCart } = useCart();

  const [activeSection, setActiveSection] = useState("contact");
  const [contactInfo, setContactInfo] = useState("");
  const [addressInfo, setAddressInfo] = useState({
    house: "",
    street: "",
    landMark: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  const totalAmount =
    source === "cart"
      ? cartItems.reduce((total, item) => {
          const price = parseFloat(
            item.productId?.price?.replace(/[^\d.]/g, "") || "0"
          );
          return total + price * (item.quantity || 1);
        }, 0)
      : parseFloat(productFromState?.price?.replace(/[^\d.]/g, "") || "0") *
        (productFromState?.quantity || 1);

  const handleSubmit = async () => {
    const storedUser = localStorage.getItem("userDetails");
    const userId = storedUser ? JSON.parse(storedUser)._id : null;
    if (!userId) return alert("Please login to place order.");

    if (paymentMethod === "card") {
      if (!cardNumber || !expiry || !securityCode || !nameOnCard) {
        return alert("Please fill all card details.");
      }
      alert("Paid Successfully");
    } else {
      alert("Payment method: Cash on Delivery (COD)");
    }

    const addressData = {
      userId,
      houseNo: addressInfo.house,
      street: addressInfo.street,
      landMark: addressInfo.landMark,
      city: addressInfo.city,
      district: addressInfo.district,
      state: addressInfo.state,
      pincode: addressInfo.pincode,
    };

    try {
      await createCustomerAddress(addressData);
    } catch (err) {
      console.error("Address save failed", err);
      return alert("Error saving address. Try again.");
    }

    const generateOrderId = () => {
      const rand = Math.floor(1000 + Math.random() * 9000);
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      return `ORD${date}-${rand}`;
    };

    const productsToOrder = productFromState
      ? [
          {
            productId: productFromState._id || productFromState.id,
            quantity: 1,
          },
        ]
      : cartItems.map((item) => ({
          productId: item.productId?._id || item._id,
          quantity: item.quantity || 1,
        }));

    const orderData = {
      id: generateOrderId(),
      buyer: userId,
      location: `${addressInfo.city}, ${addressInfo.state}, ${addressInfo.pincode}`,
      status: "Completed",
      paymentMethod:
        paymentMethod === "card" ? "Credit Card" : "Cash on Delivery",
      paymentDate: new Date(),
      products: productsToOrder,
      total: totalAmount,
    };

    try {
      await createOrder(orderData);
      clearCart();
      navigate("/payment-success", {
        state: {
          confirmedOrders: productFromState ? [productFromState] : cartItems,
          deliveryAddress: addressInfo,
        },
      });
    } catch (err) {
      console.error("Order create failed", err);
      alert("Error placing order. Try again.");
    }
  };

  return (
    <div className="payment-page-container">
      {/* Left Section */}
      <div className="payment-left-side-container">
        {/* Contact Section */}
        <div className="payent-page-contact-container">
          <div className="payment-contact-text-login">
            <h4>
              Contact{" "}
              {!contactInfo.trim() && (
                <span style={{ color: "red", fontSize: "14px" }}>
                  (Add Contact Info)
                </span>
              )}
            </h4>
            <button
              onClick={() => setActiveSection("contact")}
              className="info-edit-btn"
            >
              Add
            </button>
          </div>
          {activeSection === "contact" ? (
            <>
              <input
                type="text"
                placeholder="Email or Mobile Phone Number"
                className="payment-text-box"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
              <div className="payment-page-checkbox-input-text">
                <input type="checkbox" className="payment-check-box" />
                <p>Email me with news and offers</p>
              </div>
            </>
          ) : (
            <p>Contact Info: {contactInfo || "Not Provided"}</p>
          )}
        </div>

        {/* Delivery Section */}
        <div className="payment-delivery-conatiner-left">
          <div className="payment-contact-text-login">
            <h4>
              Delivery{" "}
              {Object.values(addressInfo).some((v) => !v.trim()) && (
                <span style={{ color: "red", fontSize: "14px" }}>
                  (Add Delivery Address)
                </span>
              )}
            </h4>
            <button
              onClick={() => setActiveSection("delivery")}
              className="info-edit-btn"
            >
              Add
            </button>
          </div>

          {activeSection === "delivery" ? (
            <>
              <select className="delivery-country-select-box">
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
              {[
                "house",
                "street",
                "landMark",
                "city",
                "district",
                "state",
                "pincode",
              ].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="payment-text-box"
                  value={addressInfo[field]}
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, [field]: e.target.value })
                  }
                />
              ))}
              <div className="payment-page-checkbox-input-text">
                <input type="checkbox" className="payment-check-box" />
                <p>Save this information for next time</p>
              </div>
            </>
          ) : (
            <div
              style={{ marginTop: "0.5rem", fontSize: "14px", color: "#333" }}
            >
              <p>
                {[
                  addressInfo.house,
                  addressInfo.street,
                  addressInfo.city,
                  addressInfo.district,
                  addressInfo.state,
                  addressInfo.pincode,
                ]
                  .filter(Boolean)
                  .join(", ") || "No address added"}
              </p>
            </div>
          )}
        </div>

        {/* Products Summary */}
        <div className="product-details-under-delivery">
          <h4>Product Details</h4>
          <div className="product-items-list">
            {(source === "cart" ? cartItems : [productFromState]).map(
              (item, i) => {
                const product = item.productId || item;
                return (
                  <div className="product-item-row" key={i}>
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="product-thumb"
                    />
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">Qty: {item.quantity || 1}</p>
                      <p className="product-price">₹{product.price}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="product-total-amount">
            <strong>Total: ₹ {totalAmount.toFixed(2)}</strong>
          </div>
        </div>

        {/* Payment Section */}
        <div className="payment-container">
          <div className="payment-contact-text-login">
            <h2>Payment</h2>
            <button
              onClick={() => setActiveSection("payment")}
              className="info-edit-btn"
            >
             Add
            </button>
          </div>
          <p className="secure-text">
            All transactions are secure and encrypted.
          </p>

          {activeSection === "payment" && (
            <div className="payment-option">
              {["card", "cod"].map((method) => (
                <div
                  key={method}
                  className={`option ${
                    paymentMethod === method ? "selected" : ""
                  }`}
                  onClick={() => setPaymentMethod(method)}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method}
                    readOnly
                    className="payment-check-box"
                  />
                  <p>
                    {method === "card"
                      ? "Credit card"
                      : "Cash on Delivery (COD)"}
                  </p>
                </div>
              ))}

              {paymentMethod === "card" && (
                <div className="card-details">
                  <input
                    type="text"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="payment-text-box"
                  />
                  <div className="row">
                    <input
                      type="text"
                      placeholder="Expiration date (MM / YY)"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="payment-text-box"
                    />
                    <input
                      type="text"
                      placeholder="Security code"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      className="payment-text-box"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Name on card"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    className="payment-text-box"
                  />
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={useShippingAsBilling}
                      onChange={(e) =>
                        setUseShippingAsBilling(e.target.checked)
                      }
                      className="payment-check-box"
                    />
                    <p>Use shipping address as billing address</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            className="pay-btn"
            onClick={handleSubmit}
            disabled={
              !contactInfo.trim() ||
              Object.values(addressInfo).some((val) => !val.trim())
            }
          >
            Pay now
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="payment-right-side-container">
        <div className="payment-right-heading">
          <h1>Items</h1>
        </div>
        <div className="payment-grid-container">
          {(source === "cart" ? cartItems : [productFromState]).map(
            (item, i) => {
              const product = item.productId || item;
              return (
                <div className="payment-data-grid" key={i}>
                  <img src={product.images?.[0]} />
                  <p>{product.name}</p>
                  <p>₹{product.price}</p>
                  <p>Qty: {item.quantity || 1}</p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
