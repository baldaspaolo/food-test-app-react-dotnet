import React from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Register() {
  const handleRegister = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      console.log("Please enter both email and password!");
      return;
    }

    console.log("Registering with:", email, password);
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
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="p-field">
            <span className="p-float-label">
              <InputText id="email" name="email" />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="p-field">
            <span className="p-float-label">
              <InputText id="password" type="password" name="password" />
              <label htmlFor="password">Password</label>
            </span>
          </div>
          <Button label="Register" style={{ marginTop: "1vh" }} />
        </form>
        <div style={{ marginTop: "1vh" }}>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
