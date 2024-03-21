import Navbar from "./components/Navbar";
import Foods from "./pages/Foods.js";
import Modify from "./pages/Modify.js";
import Home from "./pages/Home.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyProfile from "./pages/MyProfile.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import { UserContext } from "./context/UserContext.js";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({ id: null, name: null });

  //const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const setUserData = (newId, newName) => {
    setUser({ id: newId, username: newName });
  };

  return (
    <div>
      <link rel="stylesheet" type="text/css" href="index.css"></link>

      <div>
        <Router>
          <UserContext.Provider value={{ user, setUser: setUserData }}>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/all" element={<Foods />} />
              <Route path="/myProfile" element={<MyProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/modify" element={<Modify />} />{" "}
            </Routes>
          </UserContext.Provider>
        </Router>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial",
          marginTop: "30VH",
          fontWeight: "bolder",
        }}
      ></div>
    </div>
  );
}

export default App;
