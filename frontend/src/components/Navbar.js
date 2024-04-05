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

  const toast = useRef(null);

  const userId = user.id;
  const username = user.username;
  const isLogged = user.isLogged;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
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
    // Fetch product data from wherever it is stored and update the state
    // For example:
    // fetchProducts().then(data => setProducts(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const priceBody = (rowData) => {
    return formatCurrency(rowData.price);
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

  const addProduct = () => {
    const newProduct = {
      id: "unique_id", // replace with actual unique id
      name: "New Product",
      description: "Description of New Product",
      brand: "Brand Name",
      price: 0, // replace with actual price
      discount: 0, // replace with actual discount
      categoryId: "category_id", // replace with actual category id
    };
    setProducts([...products, newProduct]);
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

  return (
    <div>
      <Menubar key="1" model={items} end={end} />
      <div className="card flex flex-column align-items-center gap-3">
        <Toast ref={toast} />

        <OverlayPanel ref={op} showCloseIcon closeOnEscape dismissable={false}>
          <h2>Shopping cart</h2>
          <i style={{ cursor: "pointer", marginBottom: "2vh" }}>
            <u>Open my cart/Go to payment</u>
          </i>
          <DataTable
            value={products}
            selectionMode="single"
            paginator
            rows={5}
            selection={selectedProduct}
            onSelectionChange={(e) => setSelectedProduct(e.value)}
            onRowClick={productSelect}
            style={{ marginTop: "2vh" }}
          >
            <Column
              field="name"
              header="Name"
              sortable
              style={{ minWidth: "12rem" }}
            />
            <Column header="Image" />
            <Column
              field="price"
              header="Price"
              sortable
              body={priceBody}
              style={{ minWidth: "8rem" }}
            />
          </DataTable>
        </OverlayPanel>
      </div>
    </div>
  );
}

export default Navbar;
