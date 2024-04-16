import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

export function Product() {
  const [value1, setValue1] = useState(1);
  const [product, setProduct] = useState(null);
  const [found, setFound] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const handleChangeQuantity = (e) => {
    setValue1(e.target.value);
  };

  const addToCard = () => {
    console.log(
      "Product added to card: ",
      product + "with quantity: " + value1
    );
  };

  const fetchProduct = async (id) => {
    try {
      const url = new URL(`https://localhost:7080/api/Product/${id}`);
      const response = await fetch(url.toString(), {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Product fetched successfully: ", data);
        setProduct(data);
        setFound(true);
      } else {
        console.error("Failed to fetch product: ", data.error || data.message);
        setFound(false);
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  };

  return (
    <div>
      {!found ? (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <h1>Product not found</h1>
        </div>
      ) : (
        <div className="parent">
          <div className="div1">
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                border: "solid",
                borderRadius: "10px",
                margin: "4vh",
                height: "415px",
              }}
            >
              <img
                alt="photo"
                src={`https://robohash.org/${product.id}?100x100`}
              />
            </div>
          </div>
          <div className="div2">
            <div>
              <div
                className="flex flex-column gap-2"
                style={{ marginTop: "10vh", marginRight: "60vh" }}
              >
                <Card title="Article" style={{ width: "300%", height: "200%" }}>
                  {product && (
                    <div className="specs">
                      <div style={{ marginBottom: "2vh" }}>
                        <span className="spec-label">
                          <b>Name:</b>
                        </span>{" "}
                        {product.name}
                      </div>
                      <div style={{ marginBottom: "2vh" }}>
                        <span className="spec-label">
                          <b>Brand:</b>
                        </span>{" "}
                        {product.brand}
                      </div>
                      <div style={{ marginBottom: "2vh" }}>
                        <span className="spec-label">
                          <b>Description:</b>
                        </span>{" "}
                        {product.description}
                      </div>
                      <div>
                        <span className="spec-label">
                          <b>Price:</b>
                        </span>{" "}
                        {product.price}
                      </div>
                    </div>
                  )}
                  <div className="flex-auto" style={{ marginTop: "5vh" }}>
                    <label
                      htmlFor="stacked-buttons"
                      className="font-bold block mb-2"
                    >
                      Quantity
                    </label>
                    <InputNumber
                      inputId="stacked-buttons"
                      value={value1}
                      onValueChange={handleChangeQuantity}
                      showButtons
                      min={1}
                    />
                    <Button
                      label="Add to card"
                      severity="success"
                      style={{ marginLeft: "1vh" }}
                      onClick={addToCard}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
