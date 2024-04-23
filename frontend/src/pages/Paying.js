import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";

function Paying() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [spinner2, setSpinner2] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [useSavedAddress, setUseSavedAddress] = useState(false);

  const { user } = useContext(UserContext);

  //////////////imported from cart
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totals, setTotals] = useState({});
  const [totalPrice, setTotalsPrice] = useState(null);
  const [cartId, setCartId] = useState(null);
  //////////////////////////////////////////////////

  const userId = user.id;
  const userName = user.name;
  const userSurname = user.surname;
  const userAddress = user.address;
  const userPhone = user.phone;
  const userCountry = user.country;
  const userRegion = user.region;
  const userCity = user.city;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    phoneNumber: "",
    // Add more fields as needed
  });
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(cardData);
  };

  const handlePayButtonClick = () => {
    if (payOnDelivery && !useSavedAddress) {
      //paying on delivery with custom address ||| works
      setVisible2(true);
      setCardData({});
    }

    if (!payOnDelivery && !useSavedAddress) {
      //paying with card with custom user address ||| works
      setFormData({});
      handlePayCardCustomAddress();
      console.log(cardData);
    }

    if (!payOnDelivery && useSavedAddress) {
      handlePayCardSavedAddress();
    }

    if (payOnDelivery && useSavedAddress) {
      handlePayCardSavedAddress2();
    }
  };

  const handlePayCardCustomAddress = () => {
    if (
      cardData.cvv.length < 1 ||
      cardData.expiry.length < 1 ||
      cardData.name.length < 1 ||
      cardData.number.length < 1
    ) {
      console.log("Somethings wrong!");
    } else {
      setVisible(true);
    }
  };

  const handlePayCardSavedAddress = () => {
    if (
      cardData.cvv.length < 1 ||
      cardData.expiry.length < 1 ||
      cardData.name.length < 1 ||
      cardData.number.length < 1
    ) {
      console.log("Somethings wrong!");
    } else {
      setSpinner(true);
      setTimeout(() => {
        setSpinner(false);
        setPaymentSuccess(true);
        handlePay();
      }, 3000);
      console.log(cardData);
      console.log("User" + userName + " Surname: " + userSurname + "");
      console.log(
        "Succesfully paid with card using logged user shipping data!"
      );
    }
  };

  const handlePayCardSavedAddress2 = () => {
    setSpinner2(true);
    setTimeout(() => {
      setSpinner2(false);
      setOrderSuccess(true);
      handlePay();
    }, 3000);
    console.log(cardData);
    console.log("User" + userName + " Surname: " + userSurname + "");
    console.log("Succesfully ordered with logged user shipping data!");
  };

  const handleOrderClick = () => {
    setVisible(false);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      setPaymentSuccess(true);
      handlePay();
    }, 3000);
  };

  const handleOrder2Click = () => {
    setVisible2(false);
    setSpinner2(true);
    setTimeout(() => {
      setSpinner(false);
      setOrderSuccess(true);
      handlePay();
    }, 3000);
  };

  const handleNavigateToCart = () => {
    navigate("/home");
  };

  /////cart part
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `https://localhost:7080/api/Cart?id=${userId}`
        );
        if (!response.ok) {
          console.log("Failed to fetch!");
        } else {
          const data = await response.json();

          fetchCartProducts(data.id);
          setCartId(data.id);
        }
      } catch (error) {
        console.log("error");
      }
    };
    fetchCart();
  }, []);

  const fetchCartProducts = async (cartId) => {
    try {
      const response = await fetch(
        `https://localhost:7080/api/CartProduct?id=${cartId}`
      );
      if (!response.ok) {
        console.log("Failed to fetch products!");
      } else {
        const data = await response.json();
        const quantitiesData = {};
        let totalPrice = 0; // Initialize totalPrice here

        data.forEach((product) => {
          quantitiesData[product.product.id] = product.quantity;
          const total = product.quantity * product.product.price;
          totals[product.product.id] = total;
          totalPrice += total; // Add the total of each product to totalPrice
        });

        setQuantities(quantitiesData);
        setTotals(totals);
        setProducts(data);
        setTotalsPrice(totalPrice); // Set totalPrice state after calculating it
      }
    } catch (error) {
      console.log("error s");
      console.log(error);
    }
  };

  const deleteCartProducts = async () => {
    try {
      const response = await fetch(
        `https://localhost:7080/api/CartProduct/delete?cartId=${cartId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      console.log("Successful edit: ", data.message);

      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } catch (error) {
      console.error("Greška prilikom dodavanja hrane:", error);
    }
  };

  const handlePay = async () => {
    try {
      const response = await fetch(
        `https://localhost:7080/api/Receipt?userId=${userId}&total=${totalPrice}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      await Promise.all(
        products.map(async (item) => {
          try {
            const resp = await fetch(
              `https://localhost:7080/api/ReceiptProduct?receiptId=${data.id}&productId=${item.productId}&quantity=${item.quantity}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            deleteCartProducts();
          } catch (error) {
            console.log(error);
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  ////////

  return (
    <div>
      {/*<Button onClick={() => setVisible(true)}>Show Dialog</Button>*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5vh",
          marginRight: "10vh",
        }}
      >
        <div style={{ marginRight: "10vh" }}>
          <h2 style={{ marginLeft: "17vh" }}>Invoice</h2>
          <p>Payment amount</p>
          <p>$500.00</p>
        </div>
      </div>
      <div className="flex justify-content-center">
        <div style={{ display: "flex", marginTop: "1vh", marginBottom: "3vh" }}>
          <div className="flex align-items-center gap-2">
            <label htmlFor="payOnDelivery">Pay on Delivery</label>
            <InputSwitch
              id="payOnDelivery"
              checked={payOnDelivery}
              onChange={(e) => setPayOnDelivery(e.value)}
              style={{ marginRight: "5vh" }}
            />
          </div>
          <div className="flex align-items-center gap-2">
            <label htmlFor="useSavedAddress">Use my saved address</label>
            <InputSwitch
              id="useSavedAddress"
              checked={useSavedAddress}
              onChange={(e) => setUseSavedAddress(e.value)}
            />
          </div>
        </div>
      </div>
      <div className="card flex justify-content-center">
        <div className="flex flex-column gap-2">
          {!payOnDelivery && (
            <>
              <label htmlFor="name">Name on Card</label>
              <InputText
                id="name"
                aria-describedby="name-help"
                value={cardData.name}
                onChange={(e) =>
                  setCardData({ ...cardData, name: e.target.value })
                }
              />

              <label htmlFor="cardNumber">Card number</label>
              <InputText
                id="cardNumber"
                aria-describedby="cardNumber-help"
                value={cardData.number}
                onChange={(e) =>
                  setCardData({ ...cardData, number: e.target.value })
                }
              />

              <div className="flex align-items-center gap-2">
                <div className="flex flex-column">
                  <label htmlFor="expiryDate">Expiry date</label>
                  <InputText
                    id="expiryDate"
                    aria-describedby="expiryDate-help"
                    value={cardData.expiry}
                    onChange={(e) =>
                      setCardData({ ...cardData, expiry: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-column">
                  <label htmlFor="cvv">CVV</label>
                  <InputText
                    id="cvv"
                    aria-describedby="cvv-help"
                    value={cardData.cvv}
                    onChange={(e) =>
                      setCardData({ ...cardData, cvv: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}

          <Button
            label={payOnDelivery ? "Order and pay on delivery" : "Pay"}
            icon="pi pi-check"
            onClick={handlePayButtonClick}
            className="p-button-success"
            style={{
              width: payOnDelivery ? "80%" : "",
              marginRight: payOnDelivery ? "24vh" : "",
              marginLeft: payOnDelivery ? "7vh" : "",
            }}
          />
        </div>
      </div>
      <Dialog
        header="Enter your shipping address"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <form onSubmit={handleSubmit}>
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="surname">Surname</label>
              <InputText
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="address">Address</label>
              <InputText
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="phoneNumber">Phone Number</label>
              <InputText
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              label="Order"
              style={{ marginTop: "1vh" }}
              onClick={handleOrderClick}
            />
          </form>
        </div>
      </Dialog>

      <Dialog
        header="Enter your shipping address"
        visible={visible2}
        style={{ width: "50vw" }}
        onHide={() => setVisible2(false)}
      >
        <div className="p-fluid">
          <form onSubmit={handleSubmit}>
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="surname">Surname</label>
              <InputText
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="address">Address</label>
              <InputText
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="p-field">
              <label htmlFor="phoneNumber">Phone Number</label>
              <InputText
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              label="Order"
              style={{ marginTop: "1vh" }}
              onClick={handleOrder2Click}
            />
          </form>
        </div>
      </Dialog>

      <Dialog
        header=""
        visible={spinner}
        style={{}}
        onHide={() => setSpinner(false)}
      >
        <div className="">
          <h1>Payment in process</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!paymentSuccess ? (
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="10"
                fill="var(--surface-ground)"
                animationDuration="1s"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </Dialog>
      <Dialog header="" visible={paymentSuccess} onHide={handleNavigateToCart}>
        <div className="">
          <h1>Successfully paid!</h1>
          <p>Order is visible under your profile!</p>
        </div>
      </Dialog>

      <Dialog
        header=""
        visible={spinner2}
        style={{}}
        onHide={() => setSpinner2(false)}
      >
        <div className="">
          <h1>Ordering in process</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!orderSuccess ? (
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="10"
                fill="var(--surface-ground)"
                animationDuration="1s"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </Dialog>
      <Dialog header="" visible={orderSuccess} onHide={handleNavigateToCart}>
        <div className="">
          <h1>Successfully ordered!</h1>
          <p>Order is visible under your profile!</p>
        </div>
      </Dialog>
    </div>
  );
}

export default Paying;
