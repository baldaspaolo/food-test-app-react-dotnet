import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function Login() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Successfully logged in!",
      life: 3000,
    });
  };

  const showWarnLogin = () => {
    toast.current.show({
      severity: "error",
      summary: "Error!",
      detail: "Wrong login data!",
      life: 3000,
    });
  };

  const showWarnLogin1 = () => {
    toast.current.show({
      severity: "error",
      summary: "Error!",
      detail: "Error with establishing connection!",
      life: 3000,
    });
  };

  const loginUser = async (username, password) => {
    try {
      const url = new URL("https://localhost:7080/api/User");
      url.searchParams.append("email", username);
      url.searchParams.append("password", password);

      const response = await fetch(url.toString(), {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Uspješan login: ", data);
        showSuccess();
        setUser(data.id, data.name, true, data.departmentId);
        navigate("/");

        console.log(data.departmentId);
      } else {
        showWarnLogin();
        console.error("Neuspješna prijava: ", data.error || data.message);
      }
    } catch (error) {
      showWarnLogin1();
      console.error("Greška prilikom prijave: ", error);
    }
  };

  /*const getUser = async (id) => {
    try {
      const response = await fetch(`https://localhost:7080/api/User/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if ((await response.status) === 200) {
        console.log("Successful: ", data.message);
        showSuccess();
        console.log(data);

        //setTimeout(() => {
        //window.location.reload(true);
        //}, 1000);
      } else {
        console.error("Neuspješno  nove hrane: ", data.error || data.message);
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja hrane:", error);
    }
  };*/

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      console.log("Please enter both email and password!");
      return;
    }

    console.log("Logging in with:", email, password);
    loginUser(email, password);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="p-field">
            <span className="p-float-label">
              <InputText id="email" name="email" />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="p-field">
            <span className="p-float-label" style={{ marginTop: "1vh" }}>
              <InputText id="password" type="password" name="password" />
              <label htmlFor="password">Password</label>
            </span>
            <div style={{ marginTop: "1vh" }}>
              <Link to="/register">Register</Link>
            </div>
          </div>
          <Button style={{ marginTop: "1vh" }} label="Login" />
        </form>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default Login;
