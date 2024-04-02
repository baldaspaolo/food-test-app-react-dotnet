import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import ToDoCard from "../components/ToDoCard";

function ToDo() {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    console.log(input);
  };

  const addToDo = async () => {
    var currentDate = new Date().toISOString();
    try {
      const response = await fetch("https://localhost:7080/api/ToDo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input, date: currentDate }),
      });

      const data = await response.json();
      console.log(data);
      if (data !== null) {
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

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const response = await fetch("https://localhost:7080/api/ToDo");
        const data = await response.json();
        console.log(data);
        setToDos(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchToDos();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "2vh", marginLeft: "11vh" }}>
        <i>Add new ToDo</i>
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{ marginLeft: "11vh", marginTop: "vh", marginBottom: "5vh" }}
        >
          <InputText
            placeholder="Add new To Do Card"
            style={{ marginRight: "1vh" }}
            value={input}
            onChange={handleInputChange}
          />
          <Button raised onClick={addToDo}>
            <b>ADD</b>
          </Button>
        </div>
      </div>
      <ToDoCard toDos={toDos} />
    </div>
  );
}

export default ToDo;
