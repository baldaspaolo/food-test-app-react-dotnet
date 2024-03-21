import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Home() {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div>Home</div>
    </>
  );
}

export default Home;
