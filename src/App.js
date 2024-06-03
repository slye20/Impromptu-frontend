import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import Consumer from "./Consumer";
import Producer from "./Producer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [items, setItems] = useState([]);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };

  const addItem = (itemText) => {
    const newItem = {
      text: itemText,
      inProgress: false,
      username,
      timestamp: new Date().toLocaleString(),
    };
    setItems([...items, newItem]);
  };

  const toggleInProgress = (index) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, inProgress: !item.inProgress } : item
      )
    );
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <Routes>
            <Route
              path="/consumer"
              element={
                <Consumer
                  items={items}
                  addItem={addItem}
                  toggleInProgress={toggleInProgress}
                  username={username}
                />
              }
            />
            <Route
              path="/producer"
              element={
                <Producer
                  items={items}
                  addItem={addItem}
                  toggleInProgress={toggleInProgress}
                  username={username}
                />
              }
            />
            <Route path="/" element={<Home onLogout={handleLogout} />} />
          </Routes>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
