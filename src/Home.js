

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ onLogout }) {
  return (
    <div className="home">
      <h2>Select an Option</h2>
      <div className="options">
        <Link to="/consumer" className="option">
          Consumer
        </Link>
        <Link to="/producer" className="option">
          Producer
        </Link>
      </div>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Home;
