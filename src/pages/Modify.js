import React, { useContext } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { UserContext } from "../context/UserContext";

import "primereact/resources/primereact.min.css";

function Modify() {
  const toast = useRef(null);

  const { user } = useContext(UserContext);
  const isLogged = user.isLogged;

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "New food added to menu successfully!",
      life: 3000,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = {};
    for (let entry of formData.entries()) {
      values[entry[0]] = entry[1];
    }
    console.log(values);
    addFood(values);
  };

  const addFood = async (values) => {
    try {
      const response = await fetch("https://localhost:7080/api/Food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log("After fetch ", values);

      const data = await response.json();
      console.log(data);
      if (data !== null) {
        console.log("Uspješna dodavanje nove hrane: ", data.message);
        showSuccess();

        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
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

  return (
    <div>
      {isLogged ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <form onSubmit={handleSubmit} style={{}}>
              <div style={{ margin: "0.5em" }}>
                <h1 style={{ marginTop: "15vh", marginBottom: "5vh" }}>
                  Insert new food
                </h1>
                <label htmlFor="name">Food name</label>
                <br />
                <InputText id="name" name="name" type="text" />
              </div>
              <div style={{ margin: "0.5em" }}>
                <label htmlFor="description">Food description</label>
                <br />
                <InputTextarea
                  id="description"
                  name="description"
                  rows={5}
                  style={{ width: "27.5vh" }}
                />
              </div>
              <div style={{ margin: "0.5em" }}>
                <label htmlFor="price">Food price</label>
                <br />
                <InputText id="price" name="price" type="text" />
              </div>
              <Button
                type="submit"
                label="Submit"
                style={{ marginTop: "1vh", marginLeft: "8vh" }}
              />
            </form>
          </div>
          <Toast ref={toast} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "40vh",
          }}
        >
          <h1>You do not have acces to this site! Please log in!</h1>
        </div>
      )}
    </div>
  );
}

export default Modify;
