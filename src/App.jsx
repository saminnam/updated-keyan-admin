import { useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  const [active, setActive] = useState("Home");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home active={active} setActive={setActive} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
