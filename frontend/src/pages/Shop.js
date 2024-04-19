import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("A-Z");
  const [sortedProducts, setSortedProducts] = useState([]);

  const navigate = useNavigate();

  const sort = [
    { name: "A-Z", code: "AZ" },
    { name: "Z-A", code: "ZA" },
    { name: "Low to high", code: "LH" },
    { name: "High to low", code: "HL" },
  ];

  const sortByNameAZ = () => {
    const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
    setSortedProducts(sorted);
  };

  const sortByNameZA = () => {
    const sorted = [...products].sort((a, b) => b.name.localeCompare(a.name));
    setSortedProducts(sorted);
  };

  const sortByPriceLH = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  const sortByPriceHL = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };

  const handleDropdownChange = (e) => {
    setSelectedSort(e.name);
    if (e.name === "A-Z") {
      sortByNameAZ();
    }
    if (e.name === "Z-A") {
      sortByNameZA();
    }
    if (e.name === "Low to high") {
      sortByPriceLH();
    }
    if (e.name === "High to low") {
      sortByPriceHL();
    }
  };

  const handleRedirrect = (productId) => {
    navigate(`/product/${productId}`);
  };

  const header = (index) => {
    let pic = `https://robohash.org/${index}test?200x200`;
    return (
      <img
        alt="Card"
        src={pic}
        style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
      />
    );
  };

  const footer = () => {
    return (
      <Button
        label="Add to cart"
        icon="pi pi-cart-plus"
        className="p-button-success"
      />
    );
  };

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const response = await fetch("https://localhost:7080/api/Product");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchToDos();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      if (selectedSort === "A-Z") {
        sortByNameAZ();
      } else if (selectedSort === "Z-A") {
        sortByNameZA();
      } else if (selectedSort === "Low to high") {
        sortByPriceLH();
      } else if (selectedSort === "High to low") {
        sortByPriceHL();
      }
    }
  }, [products, selectedSort]);

  return (
    <div style={{ marginLeft: "10vh", marginRight: "10vh" }}>
      <div style={{ marginLeft: "10px" }}>
        <Dropdown
          value={selectedSort}
          onChange={(e) => {
            handleDropdownChange(e.value);
          }}
          options={sort}
          optionLabel={"name"}
          placeholder={selectedSort}
          className="w-full md:w-14rem"
          style={{ marginTop: "5vh" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "2vh",
        }}
      >
        {sortedProducts.map((item) => (
          <Card
            key={item.id}
            title={item.name}
            subTitle={"Price: " + item.price}
            header={header(item.id)}
            footer={footer()}
            onClick={(e) => handleRedirrect(item.id)}
            style={{
              margin: "1vh",
              width: "40vh",
              flexGrow: "2",
            }}
          >
            <p style={{ margin: "0" }}>{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Shop;
