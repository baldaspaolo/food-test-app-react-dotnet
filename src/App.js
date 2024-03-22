import Navbar from "./components/Navbar";
import Foods from "./pages/Foods.js";
import Modify from "./pages/Modify.js";
import Home from "./pages/Home.js";
import MyProfile from "./pages/MyProfile.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext.js";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return (
      savedUser || { id: null, name: null, isLogged: false, departmentId: null }
    );
  });

  const setUserData = (newId, newName, newLogg, departmentId) => {
    setUser({
      id: newId,
      name: newName,
      isLogged: newLogg,
      departmentId: departmentId,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
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
            <Route path="/modify" element={<Modify />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
