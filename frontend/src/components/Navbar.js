import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { OverlayPanel } from "primereact/overlaypanel";

import "primereact/resources/themes/lara-light-indigo/theme.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [pic, setPic] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [totals, setTotals] = useState({});
  const [quantities, setQuantities] = useState({});

  const toast = useRef(null);

  const userId = user.id;
  const username = user.username;
  const isLogged = user.isLogged;
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const op = useRef(null);
  const isMounted = useRef(false);

  const productSelect = (e) => {
    op.current.hide();
    toast.current.show({
      severity: "info",
      summary: "Product Selected",
      detail: e.data.name,
      life: 3000,
    });
  };

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const priceBody = (rowData) => {
    if (rowData.product && typeof rowData.product.price === "number") {
      return rowData.product.price.toLocaleString("en-US", {
        style: "currency",
        currency: "EUR",
      });
    }
    return "N/A";
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
          console.log(data);
          fetchCartProducts(data.id);
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
        setCartProducts(data);

        const quantitiesData = {}; // Declare quantitiesData here
        const newTotals = {};
        let totalPrice = 0;

        data.forEach((product) => {
          quantitiesData[product.product.id] = product.quantity;
          newTotals[product.product.id] =
            product.quantity * product.product.price;
          totalPrice += newTotals[product.product.id];
        });

        setTotals(newTotals);
        setQuantities(quantitiesData);

        console.log("Total price:", totalPrice);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAllFoodClick = () => {
    navigate("/all");
  };

  const handleModifyFoodClick = () => {
    navigate("/modify");
  };

  const handleAvatarClick = () => {
    navigate("/myProfile");
    console.log(isLogged);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    navigate("/login");
    setUser(null, null, false);
    showSuccessLogOut();
    //window.location.reload();
  };

  const handleModifyToDoClick = () => {
    navigate("/toDo");
  };

  const handleShopDoClick = () => {
    navigate("/buy");
  };

  let items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: handleHomeClick,
    },
    {
      label: "All food",
      icon: "pi pi-list",
      command: handleAllFoodClick,
    },
    {
      label: "Add food",
      icon: "pi pi-plus",
      command: handleModifyFoodClick,
    },
    {
      label: "To do",
      icon: "pi pi-list",
      command: handleModifyToDoClick,
    },
    {
      label: "Shop",
      icon: "pi pi-list",
      command: handleShopDoClick,
    },
  ];

  if (!isLogged) {
    items = [{ label: "Home", icon: "pi pi-home", command: handleHomeClick }];
  }

  const showSuccessLogOut = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Successfully logged out!",
      life: 3000,
    });
  };

  const totalPrice = Object.values(totals).reduce((acc, val) => acc + val, 0);

  const end = (
    <div
      className="flex align-items-center gap-2"
      style={{ cursor: "pointer" }}
    >
      <p onClick={handleAvatarClick}>
        {username} {isLogged}
      </p>
      {pic ? (
        <div>
          {username === "" ? (
            <div></div>
          ) : (
            <div>
              <div
                style={{
                  display: "inline",
                  marginRight: "2vh",
                }}
              >
                <i
                  className="pi pi-shopping-cart"
                  style={{ fontSize: "1.7rem" }}
                  onClick={(e) => op.current.toggle(e)}
                ></i>
              </div>
              <Avatar onClick={handleAvatarClick} image={pic} shape="circle" />
              <Button
                label="Log out"
                severity="danger"
                text
                onClick={handleLogoutClick}
              >
                <i className="pi pi-sign-out" style={{ marginLeft: "5px" }}></i>{" "}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button label="Login" text onClick={handleLoginClick} />
      )}
      <Toast ref={toast} />
    </div>
  );

  const handleCartNavigate = () => {
    navigate("/cart");
    window.location.reload(true);
  };

  return (
    <div>
      <Menubar key="1" model={items} end={end} />
      <div className="card flex flex-column align-items-center gap-3">
        <Toast ref={toast} />

        <OverlayPanel ref={op} showCloseIcon closeOnEscape dismissable={false}>
          <h2>Shopping cart</h2>
          <i
            style={{ cursor: "pointer", marginBottom: "2vh" }}
            onClick={handleCartNavigate}
          >
            <u>Open my cart/Go to payment</u>
          </i>
          <DataTable
            value={cartProducts}
            selectionMode="single"
            paginator
            rows={5}
            selection={selectedProduct}
            onSelectionChange={(e) => setSelectedProduct(e.value)}
            onRowClick={productSelect}
            style={{ marginTop: "2vh" }}
          >
            <Column
              field="product.name"
              header="Name"
              sortable
              style={{ minWidth: "12rem" }}
            />

            <Column
              field="product.price"
              header="Price"
              sortable
              body={priceBody}
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="quantity"
              header="Quantity"
              sortable
              style={{ minWidth: "8rem" }}
            />
          </DataTable>
          <div style={{ float: "right" }}>
            <p>
              <b>Total price: </b>
              {totalPrice} €
            </p>
          </div>
        </OverlayPanel>
      </div>
    </div>
  );
}

export default Navbar;
