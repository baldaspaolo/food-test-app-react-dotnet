import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "../pages/styles.css";

function ToDoCard({ toDos }) {
  const [inputs, setInputs] = useState(Array(toDos.length).fill(""));
  const [popupState, setPopupState] = useState(false);
  const toast = useRef(null);

  const success = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have delete ToDo",
      life: 3000,
    });
  };

  const afterConfirmDelete = (itemId) => {
    deleteCard(itemId);
  };

  const confirm2 = (itemId) => {
    confirmDialog({
      message: "Do you want to delete this ToDo?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => afterConfirmDelete(itemId),
    });
  };

  const deleteCard = async (id) => {
    try {
      const response = await fetch(`https://localhost:7080/api/ToDo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        success();
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } else {
        console.error("Error deleting: ", data.error || data.message);
      }
    } catch (error) {
      console.error("erorr:", error);
    }
  };

  const handleInputChange = (index, e) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;
    setInputs(newInputs);
  };

  const handleDelete = (itemId) => {
    confirm2(itemId);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {toDos?.map((item, index) => (
          <div key={item.id}>
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{item.name}</span>
                  <Button
                    icon="pi pi-times"
                    className="p-button-text"
                    style={{ padding: 0, fontSize: "1.5rem" }}
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              }
              className="md:w-25rem"
              style={{ margin: "2vh" }}
            >
              <div className="flex-1">
                <div className="parent">
                  <div className="div2"></div>
                </div>
                <div className="parent">
                  <div className="div1" style={{ marginBottom: "8vh" }}>
                    <InputText
                      placeholder="Add item"
                      value={inputs[index]}
                      onChange={(e) => handleInputChange(index, e)}
                      style={{ marginRight: "1vh" }}
                    />
                    <Button
                      icon="pi pi-check"
                      raised
                      style={{ width: "28%" }}
                    />
                  </div>
                </div>
                {item.tasks?.map((task) => (
                  <div key={task.id} className="parent">
                    <div className="div1">
                      <h3>{task.name} </h3>{" "}
                      {task.completed ? (
                        <p>Completed: Yes</p>
                      ) : (
                        <p>Completed: No</p>
                      )}{" "}
                    </div>
                    <div className="div2">
                      <Button
                        severity="success"
                        icon="pi pi-check"
                        style={{
                          height: "70%",
                          marginRight: "1vh",
                          marginTop: "3vh",
                        }}
                        onClick={() => console.log(toDos)}
                      />
                      <Button
                        severity="danger"
                        icon="pi pi-times"
                        style={{ height: "70%", marginTop: "3vh" }}
                        onClick={() => console.log(toDos)}
                      />
                    </div>
                    <Divider type="solid" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
      <Toast ref={toast} />
      <ConfirmDialog />
    </div>
  );
}

export default ToDoCard;
