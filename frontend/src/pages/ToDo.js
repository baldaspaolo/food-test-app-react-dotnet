import React, { useState, useEffect, useContext } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { UserContext } from "../context/UserContext";

import ToDoCard from "../components/ToDoCard";

function ToDo() {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useContext(UserContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.value.length < 1) {
      console.log("Prazno polje!");
    } else {
      setInput(e.target.value);
      console.log(input);
    }
  };

  const addToDo = async () => {
    var currentDate = new Date().toISOString();
    try {
      const response = await fetch("https://localhost:7080/api/ToDo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input,
          date: currentDate,
          userId: user.id,
        }),
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
        // Filter the todos based on the userId
        const filteredToDos = data.filter((todo) => todo.userId === user.id);
        console.log(filteredToDos);
        setToDos(filteredToDos);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchToDos();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h1>My ToDos</h1>
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
