import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "../pages/styles.css";

function ToDoCard({ toDos }) {
  const [inputs, setInputs] = useState(toDos.map(() => ""));
  const toast = useRef(null);

  const success = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have delete ToDo",
      life: 3000,
    });
  };

  const successComplete = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have market task as completed!",
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
        }, 100);
      } else {
        console.error("Error deleting: ", data.error || data.message);
      }
    } catch (error) {
      console.error("erorr:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`https://localhost:7080/api/Task/${id}`, {
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

  const completeTask = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`https://localhost:7080/api/Task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        successComplete();
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

  const handleClickAddTask = (index, itemId) => {
    addToDoTask(index, itemId);
  };

  const addToDoTask = async (index, itemId) => {
    //var currentDate = new Date().toISOString();
    try {
      const response = await fetch("https://localhost:7080/api/Task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputs[index], toDoId: itemId }),
      });

      const data = await response.json();
      console.log(data);
      if (data != null) {
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } else {
        console.error(
          "Neuspješno dodavanje nove hrane: ",
          data.error || data.message
        );
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja hrane:", error);
    }
  };

  const handleDelete = (itemId) => {
    confirm2(itemId);
  };

  const handleDeleteTask = (index) => {
    deleteTask(index);
  };

  const handleCompleteTask = (index) => {
    completeTask(index);
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
                      onChange={(e) => handleInputChange(index, e, item.id)}
                      style={{ marginRight: "1vh" }}
                    />
                    <Button
                      icon="pi pi-check"
                      raised
                      style={{ width: "28%" }}
                      onClick={() => handleClickAddTask(index, item.id)}
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
                      {!task.completed ? (
                        <Button
                          severity="success"
                          icon="pi pi-check"
                          style={{
                            height: "70%",
                            marginRight: "1vh",
                            marginTop: "3vh",
                          }}
                          onClick={() => handleCompleteTask(task.id)}
                        />
                      ) : (
                        <div></div>
                      )}
                      <Button
                        severity="danger"
                        icon="pi pi-times"
                        style={{ height: "70%", marginTop: "3vh" }}
                        onClick={() => handleDeleteTask(task.id)}
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
