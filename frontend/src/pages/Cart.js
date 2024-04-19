import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputNumber } from "primereact/inputnumber";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totals, setTotals] = useState({});
  const [totalPrice, setTotalsPrice] = useState(null);
  const [cartId, setCartId] = useState(null);
  const { user } = useContext(UserContext);
  const toast = useRef(null);
  const userId = user.id;

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

        data.forEach((product) => {
          quantitiesData[product.product.id] = product.quantity;
          totals[product.product.id] = product.quantity * product.product.price;
        });
        setQuantities(quantitiesData);
        setTotals(totals);
        setProducts(data);

        let totalPrice = 0;
        Object.entries(totals).forEach(([productId, total]) => {
          totalPrice += total;
        });
        setTotalsPrice(totalPrice);
      }
    } catch (error) {
      console.log("error s");
      console.log(error);
    }
  };

  const updateQuantity = async (cartId, productId, quantitiy) => {
    try {
      const response = await fetch(
        `https://localhost:7080/api/CartProduct?cartId=${cartId}&productId=${productId}&quantity=${quantitiy}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchCartProducts(cartId);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const deleteProductCart = async (cartId, productId) => {
    try {
      const response = await fetch(
        `https://localhost:7080/api/CartProduct?cartId=${cartId}&productId=${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        showSuccess();
        fetchCartProducts(cartId);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const handleChangeQuantity = (cartId, productId, value, price) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
    updateQuantity(cartId, productId, value);
    const totalPrice = value * price;

    setTotals((prevState) => ({
      ...prevState,
      [productId]: totalPrice,
    }));
  };

  const removeButton = (rowData) => {
    return <Button icon="pi pi-trash" onClick={() => handleRemove(rowData)} />;
  };

  const handleRemove = (rowData) => {
    deleteProductCart(rowData.cartId, rowData.product.id);
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Product removed from Cart!",
      life: 3000,
    });
  };

  const inputNumber = (rowData) => {
    const productId = rowData.product.id;
    return (
      <div style={{ width: "15vh" }}>
        <InputNumber
          value={quantities[productId] || 0}
          onValueChange={(e) =>
            handleChangeQuantity(
              rowData.cartId,
              rowData.product.id,
              e.value,
              rowData.product.price
            )
          }
          showButtons
          min={1}
        />
      </div>
    );
  };
  //https://localhost:7080/api/ReceiptProduct?receiptId=5&productId=13&quantity=5
  //https://localhost:7080/api/CartProduct/delete?cartId=3

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
        `https://localhost:7080/api/Receipt?userId=${userId}`,
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

  return (
    <div className="card" style={{ margin: "5vh" }}>
      <h1>My Cart</h1>
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
        <Column field="product.id" header="Code"></Column>

        <Column field="product.name" header="Name"></Column>
        <Column field="product.category.name" header="Category"></Column>
        <Column field="product.price" header="Price"></Column>
        <Column
          header="Total"
          body={(rowData) => totals[rowData.product.id] || 0}
        ></Column>
        <Column field="quantity" header="Quantity" body={inputNumber}></Column>
        <Column header="Remove" body={removeButton}></Column>
      </DataTable>
      <Toast ref={toast} />
      {totalPrice !== 0 ? (
        <div style={{ float: "right", marginRight: "17vh", marginTop: "5vh" }}>
          <p>
            <b>Base price: </b>
            {totalPrice - (totalPrice * 25) / 100} €
          </p>
          <p>
            <b>TAX 25%: </b>
            {(totalPrice * 25) / 100} €
          </p>

          <p>
            <b>Total price: </b>
            {totalPrice} €
          </p>
          <Button severity="danger" onClick={handlePay}>
            Pay
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
