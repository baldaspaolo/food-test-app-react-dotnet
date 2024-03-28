import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { Dialog } from "primereact/dialog";

function MyProfile() {
  const toast = useRef(null);

  const showWarn = () => {
    toast.current.show({
      severity: "warn",
      summary: "Warning",
      detail: "Password is not correct!",
      life: 3000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "User successfully edited!",
      life: 3000,
    });
  };

  const { user } = useContext(UserContext);
  /*const [newUser, setNewUser] = useState({
    id: null,
    name: null,
    email: null,
    password: null,
    passwordR: null,
  });*/
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [pw, setPw] = useState("");

  const [logged, setLogged] = useState({
    id: null,
    name: null,
    email: null,
    password: null,
    role: null,
    department: null,
  });

  const [editedUser, setEditedUser] = useState({
    id: user.id,
    name: null,
    email: null,
    role: null,
    departmentId: null,
  });

  const isLogged = user.isLogged;
  const userId = user.id;

  const handelPasswordChange = (e) => {
    setPw(e.target.value);
  };

  const handleChangeData = (e) => {
    e.preventDefault();
    console.log("Logged: ", logged);
    const { name, value } = e.target;

    setEditedUser({ ...editedUser, [name]: value });
  };

  const checkPassword = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7080/api/User/password/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pw),
        }
      );
      const data = await response.json();
      if (await response.ok) {
        console.log("Zaporka je točno!");
        editUser();
      } else {
        console.error("Zaporka nije točna: ");
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja hrane:", error);
    }
  };

  const editUser = async () => {
    try {
      const response = await fetch(
        `https://localhost:7080/api/User/${logged.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Successful edit: ", data.message);
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      } else {
        console.error("Unsuccessful edit: ", data.error || data.message);
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleCheckPassword = () => {
    checkPassword(userId);
  };

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const response = await fetch(`https://localhost:7080/api/User/${id}`);
        const data = await response.json();
        setLogged({
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          department: data.department.name,
        });
        setEditedUser({
          id: data.id,
          name: data.name,
          email: data.email,
          password: "",
          role: data.role,
          departmentId: data.departmentId,
        });
        console.log(logged);
      } catch (error) {
        console.log("Error!!!!", error);
      }
    };
    fetchUser(userId);
  }, []);

  return (
    <>
      <div>
        {isLogged ? (
          <div>
            <div
              className="p-grid p-nogutter p-align-center"
              style={{ height: "100vh", padding: "20px" }}
            >
              {visible ? (
                <div className="p-col-12">
                  <h1>My Profile</h1>
                  <Card title="User Information" style={{ width: "100%" }}>
                    <div className="p-grid">
                      <div className="p-col-12">
                        <label>
                          <b>Username: </b>
                        </label>
                        <span>{logged.name}</span>
                      </div>
                      <div className="p-col-12">
                        <label>
                          <b>Email: </b>
                        </label>
                        <span>{logged.email}</span>
                      </div>
                      <div className="p-col-12">
                        <label>
                          <b>Role: </b>
                        </label>
                        <span>{logged.role}</span>
                      </div>
                    </div>
                  </Card>
                  <Button
                    label="Edit Profile"
                    icon="pi pi-pencil"
                    className="p-button-raised p-button-secondary"
                    style={{ marginTop: "2vh" }}
                    onClick={() => setVisible(false)}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <form onSubmit={editUser} style={{}}>
                    <div style={{ margin: "0.5em" }}>
                      <h1 style={{ marginTop: "5vh", marginBottom: "5vh" }}>
                        Change your data
                      </h1>
                      <label htmlFor="name">Name</label>
                      <br />
                      <InputText
                        id="name"
                        name="name"
                        type="text"
                        value={editedUser.name}
                        onChange={handleChangeData}
                      />
                    </div>
                    <div style={{ margin: "0.5em" }}>
                      <label htmlFor="description">Email</label>
                      <br />
                      <InputText
                        id="email"
                        name="email"
                        type="text"
                        value={editedUser.email}
                        onChange={handleChangeData}
                      />
                    </div>
                    {/*<div style={{ margin: "0.5em" }}>
                      <label htmlFor="price">Password</label>
                      <br />
                      <InputText
                        id="password"
                        name="password"
                        type="password"
                        value={pw}
                        onChange={handelPasswordChange}
                />
                </div>*/}
                    <Button
                      type="button"
                      label="Change data"
                      style={{ marginTop: "1vh", marginLeft: "8vh" }}
                      onClick={() => setVisible2(true)}
                    />
                    <Dialog
                      header="Please enter your password for verification!"
                      visible={visible2}
                      style={{ width: "30vw" }}
                      onHide={() => setVisible2(false)}
                    >
                      <div
                        style={{
                          marginLeft: "15vh",
                        }}
                      >
                        <label htmlFor="price">Password</label>
                        <br />
                        <InputText
                          id="password"
                          name="password"
                          type="password"
                          value={pw}
                          onChange={handelPasswordChange}
                        />
                      </div>
                      <Button
                        type="button"
                        label="Change data"
                        style={{ marginTop: "1vh", marginLeft: "20vh" }}
                        onClick={handleCheckPassword}
                      />
                    </Dialog>
                  </form>
                </div>
              )}
            </div>
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
    </>
  );
}

export default MyProfile;
