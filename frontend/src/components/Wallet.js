import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const MyWallet = () => {
  const products = [
    { code: "001", name: "Product A", category: "Category 1", quantity: 10 },
    { code: "002", name: "Product B", category: "Category 2", quantity: 20 },
    { code: "003", name: "Product C", category: "Category 1", quantity: 15 },
  ];
  return (
    <div>
      <div style={{ marginLeft: "5vh", width: "165vh" }}>
        <Card style={{ width: "165vh", height: "72vh" }}>
          <div style={{ margin: "3vh" }}>
            <div>
              <h1>My Wallet</h1>
              <p>
                <b>My balance: </b> 50€
              </p>
              <Button label="Add founds" text raised />
            </div>
            <div style={{ marginTop: "4vh" }}>
              <h2>Last transactions</h2>
              <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
              </DataTable>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyWallet;
