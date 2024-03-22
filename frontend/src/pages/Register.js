import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

//https://localhost:7080/api/Departments

function Register() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  //const [id, setId] = useState();
  //const [postData, setPostData] = useState();

  const toastCenter = useRef(null);
  const toast = useRef(null);
  const navigate = useNavigate();

  const showWarning = () => {
    toastCenter.current.show({
      severity: "error",
      summary: "Neispravna email adresa!",
      detail: "Please enter a valid email adress!",
      life: 3000,
    });
  };
  const showWarning1 = () => {
    toastCenter.current.show({
      severity: "error",
      summary: "Invalid form!",
      detail: "Please enter all data!",
      life: 3000,
    });
  };
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Successfully logged in!",
      life: 3000,
    });
  };

  /*const showWarning2 = () => {
    toastCenter.current.show({
      severity: "error",
      summary: "Invalid password lenght!",
      detail: "Please enter longer passsword!",
      life: 3000,
    });
  };*/

  const handleRegister = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.nameUser.value;
    const departmentId = selectedDepartment ? selectedDepartment.id : null;
    const role = "visitor";

    if (!email || !password || !name || !departmentId) {
      showWarning1();
      return;
    }
    if (!email.includes("@")) {
      showWarning();
      return;
    }

    const userData = { email, password, name, departmentId, role };
    addUser(userData);
  };

  const addUser = async (values) => {
    try {
      const response = await fetch("https://localhost:7080/api/User/register", {
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
        console.log("Uspješna dodavanje novog korisnika: ", data.message);
        showSuccess();
        setTimeout(() => {
          window.location.reload(true);
        }, 1500);
        navigate("/login");
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
    const fetchDepartments = async () => {
      try {
        const response = await fetch("https://localhost:7080/api/Departments");
        const data = await response.json();
        console.log(data);
        setDepartments(data);
        //setId(data.id);
      } catch (error) {
        console.log("Error!!!!", error);
      }
    };

    fetchDepartments();
  }, []);
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
          <div className="p-field" style={{ marginBottom: "1vh" }}>
            <span className="p-float-label">
              <InputText id="nameUser" name="nameUser" />
              <label htmlFor="nameUser">Name</label>
            </span>
          </div>
          <div className="p-field" style={{ marginBottom: "1vh" }}>
            <span className="p-float-label">
              <InputText id="email" name="email" />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="p-field" style={{ marginBottom: "1vh" }}>
            <span className="p-float-label">
              <InputText id="password" type="password" name="password" />

              <label htmlFor="password">Password</label>
            </span>
          </div>
          <div className="p-field" style={{ marginBottom: "1vh" }}>
            <span className="p-float-label">
              <Dropdown
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.value)}
                options={departments}
                optionLabel="name"
                placeholder="Select a Department"
                className="w-full md:w-14rem"
              />
            </span>
          </div>
          <div style={{ marginTop: "1vh" }}>
            <Link to="/login">Login</Link>
          </div>
          <Button label="Register" style={{ marginTop: "1vh" }} />
        </form>
      </div>
      <Toast ref={toastCenter} position="center" />
      <Toast ref={toast} />
    </div>
  );
}

export default Register;
