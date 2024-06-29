import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {localStorage.getItem("username") ? (
            // If logged in, show the Home component and allow navigating to it directly
            <Route path="/" element={<Home />} />
          ) : (
            // If not logged in, show the Login component and redirect all other paths to "/"
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
