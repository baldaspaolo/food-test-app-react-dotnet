import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function MyOrders() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const userId = user.id;

  const [orders, setOrders] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);

  // eslint-disable-line react-hooks/exhaustive-deps

  const expandAll = () => {
    let _expandedRows = {};

    orders.forEach((order) => (_expandedRows[`${order.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };

  const rowExpansionTemplate = (order) => {
    return (
      <div className="p-3">
        <h5>Ordered Products for Order ID: {order.id}</h5>
        <DataTable value={order.receiptProducts}>
          <Column field="product.name" header="Product Name" sortable />
          <Column field="product.price" header="Price" sortable />
          <Column field="quantity" header="Quantity" sortable />
        </DataTable>
        <p>
          <b>Total price: </b>
          {order.total}€
        </p>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} />
      <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
    </div>
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response =
          await fetch(`https://localhost:7080/api/Receipt/list/${userId}
            `);
        const data = await response.json();
        setOrders(data);
        console.log(data);
      } catch (error) {}
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "4vh",
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <DataTable
            value={orders}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="id"
            header={header}
            tableStyle={{ width: "100%" }}
          >
            <Column expander style={{ width: "5rem" }} />
            <Column field="id" header="Order ID" sortable />
            <Column field="total" header="Total Price" sortable />
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
