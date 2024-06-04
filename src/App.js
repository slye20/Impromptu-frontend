import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WelcomeBanner from "./Components/WelcomeBanner";
import TaskManager from "./Components/TaskManager";
import CommonScreen from "./Components/CommonScreen";
import Login from "./Components/Login";
//import Home from './Components/Home'; // Assuming Home is another component you might use

function getStoredTasks() {
  const rawTasks = window.localStorage.getItem("tasks");
  if (rawTasks != null) {
    return JSON.parse(rawTasks);
  } else {
    return [];
  }
}

function setStoredTasks(newTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function App() {
  const [tasks, setTasks] = useState(getStoredTasks());
  const [items, setItems] = useState([]);
  const [userRequests, setUserRequests] = useState({});

  const handleLogin = (username) => {
    setUserRequests((prevRequests) => ({
      ...prevRequests,
      [username]: {
        outgoingRequest: { consumer: [], producer: [] },
        inProgress: [],
      },
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  // Function to update the common screen
  const updateCommonScreen = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <Router>
      <div className="App">
        {localStorage.getItem("username") ? (
          <>
            <WelcomeBanner
              numTasks={tasks.length}
              username={localStorage.getItem("username")}
              onLogout={handleLogout}
            />
            <TaskManager tasks={tasks} setTasks={setTasks} />
            <CommonScreen items={items} />
            {/* Added items prop to CommonScreen if needed */}
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {/* Redirect to main if logged in */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
