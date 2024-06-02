
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ onLogout, userRequests }) {
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
      <div className="request-table">
        <table>
          <thead>
            <tr>
              <th>Outgoing Requests</th>
              <th>In Progress Requests</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h3>Outgoing Requests</h3>
                <ul>
                  {userRequests &&
                    userRequests.outgoingRequest &&
                    [...userRequests.outgoingRequest.consumer, ...userRequests.outgoingRequest.producer].map(
                      (request, index) => (
                        <li key={index}>{request.text}</li>
                      )
                    )}
                </ul>
              </td>
              <td>
                <h3>In Progress Requests</h3>
                <ul>
                  {userRequests &&
                    userRequests.inProgress &&
                    userRequests.inProgress.map((request, index) => (
                      <li key={index}>{request.text}</li>
                    ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
