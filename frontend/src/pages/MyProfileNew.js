import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import MyWallet from "../components/Wallet";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

import "./styles.css";

function MyProfileNew() {
  const [pic, setPic] = useState(null);
  const [activeButton, setActiveButton] = useState("myOrders");

  const { user } = useContext(UserContext);

  const userId = user.id;
  const username = user.name;
  const surname = user.surname;

  const isLogged = user.isLogged;

  let items = [
    {
      label: "My Orders",
      icon: "pi pi-list",
      command: () => handleMenuItemClick("myOrders"),
    },
    {
      label: "My Wallet",
      icon: "pi pi-wallet",
      command: () => handleMenuItemClick("myWallet"),
    },
  ];

  let items2 = [
    {
      label: "Personal information",
      icon: "pi pi-id-card",
      command: () => handleMenuItemClick("personalInformation"),
    },

    {
      label: "Adresses",
      icon: "pi pi-address-book",
      command: () => handleMenuItemClick("addresses"),
    },
    {
      label: "Payment methods",
      icon: "pi pi-credit-card",
      command: () => handleMenuItemClick("paymentMethods"),
    },
    {
      label: "Rewards",
      icon: "pi pi-star",
      command: () => handleMenuItemClick("rewards"),
    },
  ];

  let settings = [
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => handleMenuItemClick("settings"),
    },
  ];

  const header = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        alt="Card"
        src={pic}
        style={{ borderRadius: "50%", width: "auto", height: "100px" }}
      />
    </div>
  );

  const title = (
    <div style={{ display: "flex", justifyContent: "center", margin: 0 }}>
      <h2>My profile</h2>
    </div>
  );

  const subTitle = (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>My Profile</h1>
      <p>{username + surname}</p>
      <div
        className="card flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <Button
          label="Go to my Data"
          severity="secondary"
          style={{ fontSize: "0.8rem" }}
          outlined
        />
      </div>
    </div>
  );

  const handleMenuItemClick = (event) => {
    console.log(event);
    if (event === "myWallet") {
      setActiveButton("myWallet");
    }
    if (event === "myOrders") {
      setActiveButton("myOrders");
    }
    if (event === "personalInformation") {
      setActiveButton("personalInformation");
    }
    if (event === "addresses") {
      setActiveButton("addresses");
    }
    if (event === "paymentMethods") {
      setActiveButton("paymentMethods");
    }
    if (event === "addresses") {
      setActiveButton("addresses");
    }
    if (event === "rewards") {
      setActiveButton("rewards");
    }
    if (event === "settings") {
      setActiveButton("settings");
    }
  };

  useEffect(() => {
    const fetchAvatar = async (userId) => {
      try {
        const response = await fetch(
          `https://robohash.org/${userId}test?200x200`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch avatar");
        }
        const imageURL = response.url;
        setPic(imageURL);
      } catch (error) {
        console.log("Error fetching avatar:", error.message);
      }
    };

    if (userId) {
      fetchAvatar(userId);
    } else {
      setPic(null);
    }

    return () => {
      setPic(null);
    };
  }, [userId]);

  return (
    <div>
      <div class="parent1" style={{ margin: "5vh" }}>
        <div
          class="div12"
          style={{ margin: "0", height: "30%", width: "20rem" }}
        >
          <Card
            subTitle={subTitle}
            header={header}
            className="md:w-20rem md:h-20rem"
          ></Card>
        </div>
        <div class="div22" style={{ marginTop: "1vh", marginRight: "" }}>
          <Menu
            model={items}
            style={{ width: "20rem " }}
            onClick={handleMenuItemClick}
          />
          <Menu model={items2} style={{ width: "20rem", marginTop: "1vh" }} />
          <Menu model={settings} style={{ width: "20rem", marginTop: "1vh" }} />
        </div>
        <div class="div32">
          <MyWallet />
        </div>
      </div>
    </div>
  );
}

export default MyProfileNew;
