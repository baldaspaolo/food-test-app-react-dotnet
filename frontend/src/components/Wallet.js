import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";

const MyWallet = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(50);

  const navigate = useNavigate();

  const products = [
    { code: "001", name: "Product A", category: "Category 1", quantity: 10 },
    { code: "002", name: "Product B", category: "Category 2", quantity: 20 },
    { code: "003", name: "Product C", category: "Category 1", quantity: 15 },
  ];

  const handleNavigateAdd = () => {
    navigate(`/addFounds/${value}`);
  };
  return (
    <div>
      <div style={{ marginLeft: "5vh", width: "160vh" }}>
        <Card style={{ width: "160vh", height: "79vh" }}>
          <div style={{ margin: "3vh" }}>
            <div>
              <h1>My Wallet</h1>
              <p>
                <b>My balance: </b> 50€
              </p>
              <Button
                label="Add founds"
                text
                raised
                onClick={() => setVisible(true)}
              />
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
      <Dialog
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Set the desidered value
        </h1>
        <div className="flex items-center justify-center">
          <InputNumber
            inputId="stacked-buttons"
            value={value}
            onValueChange={(e) => setValue(e.value)}
            showButtons
            mode="currency"
            currency="EUR"
          />
        </div>
        <div
          className="flex items-center justify-center"
          style={{ marginTop: "1vh" }}
        >
          <Button onClick={handleNavigateAdd}>Add</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default MyWallet;
