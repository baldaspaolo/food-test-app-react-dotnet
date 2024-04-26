import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputSwitch } from "primereact/inputswitch";
import { Divider } from "primereact/divider";
import { useParams } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FaCcVisa } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa6";
import { FaAmazonPay } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa";

function Payment() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [useMyWallet, setUseMyWallet] = useState(false);
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const { valueToAdd } = useParams();

  return (
    <div className="flex items-center justify-center justify-items-center">
      <div style={{ marginTop: "5vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3vh",
            marginRight: "10vh",
          }}
        >
          <div style={{ marginRight: "10vh" }}>
            <h2 style={{ marginLeft: "21vh" }}>PAYMENT</h2>
            <div>
              <p>
                <b>Payment amount</b>
              </p>
              <p>
                <b>{valueToAdd} €</b>
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Divider />
        </div>
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <FaCcVisa style={{ width: "10%", height: "10%" }} />
          <FaCcMastercard style={{ width: "10%", height: "10%" }} />
          <FaAmazonPay style={{ width: "10%", height: "10%" }} />
          <FaCcPaypal style={{ width: "10%", height: "10%" }} />
          <FaCcApplePay style={{ width: "10%", height: "10%" }} />
          <FaGooglePay style={{ width: "10%", height: "10%" }} />
        </div>
        <div
          style={{
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Divider />
        </div>
        <div
          style={{ marginBottom: "2vh", marginLeft: "2vh", marginTop: "3vh" }}
        >
          <div className="flex align-items-center gap-2">
            <label htmlFor="useMyWallet">Use my Wallet</label>
            <InputSwitch
              id="useMyWallet"
              checked={useMyWallet}
              onChange={(e) => setUseMyWallet(e.value)}
            />
          </div>
        </div>
        <Card>
          <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
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
              <Button
                label="Pay"
                icon="pi pi-check"
                className="p-button-success"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Payment;
