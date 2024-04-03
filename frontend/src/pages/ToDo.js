import React, { useState, useEffect } from "react";
import ToDoCard from "../components/ToDoCard";

function ToDo() {
  const [toDos, setToDos] = useState([]);

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
      <ToDoCard toDos={toDos} />
    </div>
  );
}

export default ToDo;
