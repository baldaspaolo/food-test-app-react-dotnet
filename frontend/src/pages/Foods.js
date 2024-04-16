import React, { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./styles.css";

function Foods() {
  const [food, setFood] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  const { user } = useContext(UserContext);

  const toast = useRef(null);
  const isLogged = user.isLogged;

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "New food added to menu successfully!",
      life: 3000,
    });
  };

  const showDeleteSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "New food deleted successfully!",
      life: 3000,
    });
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch("https://localhost:7080/api/Food");
        const data = await response.json();
        setFood(data);
      } catch (error) {
        console.log("Error!!!!", error);
      }
    };
    fetchFood();
    console.log("Is logged: " + isLogged + "Username: " + user.name);
  }, []);

  const editFood = async (values) => {
    try {
      const response = await fetch(
        `https://localhost:7080/api/Food/${selectedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      console.log("After fetch ", values);

      const data = await response.json();
      console.log(data);
      if ((await response.status) === 200) {
        console.log("Successful edit: ", data.message);
        showSuccess();

        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } else {
        console.error("Neuspješno  nove hrane: ", data.error || data.message);
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja hrane:", error);
    }
  };

  const deleteFood = async (id) => {
    try {
      const response = await fetch(`https://localhost:7080/api/Food/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Successful edit: ", data.message);
        showDeleteSuccess();
        setSelectedId(null);

        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } else {
        console.error("Neuspješno  nove hrane: ", data.error || data.message);
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja hrane:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting food with ID:", id);
    const selected = food.find((item) => item.id === id);
    setSelectedId(selected.id);
    await deleteFood(id);
  };

  const handleModify = (id, values) => {
    console.log("Modifying food with ID:", id);
    const selected = food.find((item) => item.id === id);
    setSelectedId(selected.id);
    setSelectedFood(selected);

    //const modif = { ...selectedFood, id };
    setVisible(true);
  };

  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );

  const handleSubmit = (event, id) => {
    event.preventDefault();
    console.log("Submitting form data:", selectedFood);

    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (isConfirmed) {
      setVisible(false);
      editFood(selectedFood);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedFood({ ...selectedFood, [name]: value });
  };

  return (
    <div>
      {isLogged ? (
        <div className="parent">
          <div
            className="div1"
            style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
          >
            {food.map((item, index) => (
              <div key={index} className="col-md-4">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Card
                    key={index}
                    title={item.name}
                    subTitle={item.price}
                    header={header}
                    className="card md:w-25rem"
                    style={{ margin: "2vh" }}
                  >
                    <p>{item.description}</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => handleModify(item.id, selectedFood)}
                      >
                        Modify
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
          <Dialog
            header="Modify menu"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
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
                  <label htmlFor="name">Food name</label>
                  <br />
                  <InputText
                    id="name"
                    name="name"
                    type="text"
                    value={selectedFood?.name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ margin: "0.5em" }}>
                  <label htmlFor="description">Food description</label>
                  <br />
                  <InputTextarea
                    id="description"
                    name="description"
                    rows={5}
                    style={{ width: "27.5vh" }}
                    value={selectedFood?.description || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ margin: "0.5em" }}>
                  <label htmlFor="price">Food price</label>
                  <br />
                  <InputText
                    id="price"
                    name="price"
                    type="text"
                    value={selectedFood?.price || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <Button
                  type="submit"
                  label="Submit"
                  style={{
                    marginTop: "1vh",
                    marginLeft: "8vh",
                    cursor: "pointer",
                  }}
                />
              </form>
            </div>
          </Dialog>
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

export default Foods;
