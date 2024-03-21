import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import "primereact/resources/themes/lara-light-indigo/theme.css";

function Navbar() {
  const { user } = useContext(UserContext);

  const userId = user.id;
  const username = user.username;
  const navigate = useNavigate();

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
  };

  const items = [
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
  ];

  const end = (
    <div
      className="flex align-items-center gap-2"
      style={{ cursor: "pointer" }}
      onClick={handleAvatarClick}
    >
      <p>{username}</p>
      <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div>
      <Menubar key="1" model={items} end={end} />
    </div>
  );
}

export default Navbar;
