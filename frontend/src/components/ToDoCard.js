import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import "../pages/styles.css";

function ToDoCard({ toDos }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {toDos?.map((item) => (
          <div>
            <Card
              title={item.name}
              className="md:w-25rem"
              key={item.id}
              style={{ margin: "2vh" }}
            >
              <div className="flex-1">
                <div className="parent">
                  <div className="div1">
                    <h2>ToDo number: {item.id}</h2>
                  </div>
                  <div className="div2">
                    <Button
                      size="small"
                      severity="danger"
                      style={{ height: "60%", width: "100%", marginTop: "3vh" }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {item.tasks?.map((task) => (
                  <div class="parent">
                    <div class="div1">
                      <h3>{task.name} </h3>{" "}
                      {task.completed ? (
                        <h4>Completed: Yes</h4>
                      ) : (
                        <h4>Completed: No</h4>
                      )}{" "}
                    </div>
                    <div class="div2">
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
    </div>
  );
}

export default ToDoCard;
