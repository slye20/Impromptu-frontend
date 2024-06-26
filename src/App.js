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

// Retrieve locally stored tasks
// pull from api
function getStoredTasks() {
  const rawTasks = window.localStorage.getItem("tasks");
  if (rawTasks != null) {
    return JSON.parse(rawTasks);
  } else {
    return [];
  }
}

// Takes in argument of a array of tasks and save it in local
// send to API
function setStoredTasks(newTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(newTasks));
}

function App() {
  // tasks default retrieve from local storage
  const [tasks, setTasks] = useState(getStoredTasks());

  // default not logged in when app launched
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // store the username that is logged into, empty string
  const [username, setUsername] = useState("");

  // All the tasks associated with the local user
  // should remove since multiple users can access same pc
  const [userRequests, setUserRequests] = useState({});

  // when successfully logged in,
  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
    // maybe remove this change to pull from api
    setUserRequests((prevRequests) => ({
      ...prevRequests,
      [username]: {
        outgoingRequest: { consumer: [], producer: [] },
        inProgress: [],
      },
    }));
  };

  /*
  // unused
  const [items, setItems] = useState([]);

  // Function to update the common screen
  // (should remove and put in common screen, pull from api instead)
  const updateCommonScreen = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };
  */

  // When log out, refresh page
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  // dont know
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  // shuold check if is logged in first
  return (
    <Router>
      <div className>
        {isLoggedIn ? (
          <>
            <WelcomeBanner
              numTasks={tasks.length}
              username={username}
              onLogout={handleLogout}
            />
            <TaskManager tasks={tasks} setTasks={setTasks} />
            <CommonScreen />
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
