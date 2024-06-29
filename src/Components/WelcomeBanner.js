import React from "react";
import Button from "@mui/material/Button";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

function WelcomeBanner() {
  // When log out, refresh page
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Welcome back, {localStorage.getItem("username")}!
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="error"
                size="medium"
                onClick={handleLogout}
                sx={{ ml: 2 }} // Optional margin-left to add some space between text and button
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default WelcomeBanner;
