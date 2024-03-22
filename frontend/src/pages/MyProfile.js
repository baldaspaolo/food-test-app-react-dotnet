import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

function MyProfile() {
  const { user } = useContext(UserContext);
  const [logged, setLogged] = useState({
    id: null,
    name: null,
    email: null,
    role: null,
    department: null,
  });

  const isLogged = user.isLogged;
  const userId = user.id;

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const response = await fetch(`https://localhost:7080/api/User/${id}`);
        const data = await response.json();
        setLogged({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          department: data.department.name,
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
                />
              </div>
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
