import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [pic, setPic] = useState(null);

  const toast = useRef(null);

  const userId = user.id;
  const username = user.username;
  const isLogged = user.isLogged;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvatar = async (userId) => {
      try {
        const response = await fetch(
          `https://robohash.org/${userId}test?200x200`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch avatar");
        }
        const imageURL = response.url;
        setPic(imageURL);
      } catch (error) {
        console.log("Error fetching avatar:", error.message);
      }
    };

    if (userId) {
      fetchAvatar(userId);
    } else {
      setPic(null);
    }

    return () => {
      setPic(null);
    };
  }, [userId]);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAllFoodClick = () => {
    navigate("/all");
  };

  const handleModifyFoodClick = () => {
    navigate("/modify");
  };

  const handleAvatarClick = () => {
    navigate("/myProfile");
    console.log(isLogged);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    navigate("/login");
    setUser(null, null, false);
    showSuccessLogOut();
    //window.location.reload();
  };

  const handleModifyToDoClick = () => {
    navigate("/toDo");
  };

  let items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: handleHomeClick,
    },
    {
      label: "All food",
      icon: "pi pi-list",
      command: handleAllFoodClick,
    },
    {
      label: "Add food",
      icon: "pi pi-plus",
      command: handleModifyFoodClick,
    },
    {
      label: "To do",
      icon: "pi pi-list",
      command: handleModifyToDoClick,
    },
  ];

  if (!isLogged) {
    items = [{ label: "Home", icon: "pi pi-home", command: handleHomeClick }];
  }

  const showSuccessLogOut = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Successfully logged out!",
      life: 3000,
    });
  };

  const end = (
    <div
      className="flex align-items-center gap-2"
      style={{ cursor: "pointer" }}
    >
      <p onClick={handleAvatarClick}>
        {username} {isLogged}
      </p>
      {pic ? (
        <div>
          {username === "" ? (
            <div></div>
          ) : (
            <div>
              <Avatar onClick={handleAvatarClick} image={pic} shape="circle" />
              <Button
                label="Log out"
                severity="danger"
                text
                onClick={handleLogoutClick}
              >
                <i className="pi pi-sign-out" style={{ marginLeft: "5px" }}></i>{" "}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button label="Login" text onClick={handleLoginClick} />
      )}
      <Toast ref={toast} />
    </div>
  );

  return (
    <div>
      <Menubar key="1" model={items} end={end} />
    </div>
  );
}

export default Navbar;
