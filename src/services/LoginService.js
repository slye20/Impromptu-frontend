import { API_URL } from "../constants/constants";

// user is an object with username, password and email keys.
const apiLogin = (user) => {
  fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("Invalid username");
      } else if (response.status === 401) {
        throw new Error("Invalid password");
      } else {
        throw new Error("An error occured. Please try again later.");
      }
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("token", data.token);
    });
};

export default apiLogin;
