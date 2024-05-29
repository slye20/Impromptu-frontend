
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Producer.css';

function Producer({ items, addItem, toggleInProgress, username }) {
  const [service, setService] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (service) {
      addItem(`Service: ${service}`);
      setService('');
    }
  };

  return (
    <div className="producer">
      <button onClick={() => navigate('/')}>Back</button>
      <h2>Producer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Enter your service"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div className="common-screen">
        <h2>Common Screen</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index} style={{ color: item.inProgress ? 'orange' : 'black' }}>
              {item.text} <br />
              <small>by {item.username} at {item.timestamp}</small>
              {!item.inProgress && item.text.startsWith('Request:') && item.username !== username && (
                <button onClick={() => toggleInProgress(index)}>Accept</button>
              )}
              {item.inProgress && <span> - In Progress</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Producer;
