import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const LoginPanel = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  //TODO: submit to backend
  const handleLogin = () => {
    //sendRequest(userCredentials)
  };

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "30%",
          gap: "1.5rem",
          boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
          borderRadius: "25px",
          padding: "2rem",
        }}
      >
        <h2>Log In</h2>
        <Stack gap={2} sx={{ rowGap: "2rem", alignItems: "center" }}>
          <TextField
            placeholder="Username"
            label="Username"
            type="text"
            style={{ height: "2rem", width: "100%", borderRadius: "25px" }}
            onChange={(e) =>
              setUserCredentials((prevValue) => ({
                ...prevValue,
                username: e.target.value,
              }))
            }
          />
          <TextField
            label="Password"
            placeholder="*******"
            type="password"
            style={{ height: "2rem", borderRadius: "25px", width: "100%" }}
            onChange={(e) =>
              setUserCredentials((prevValue) => ({
                ...prevValue,
                password: e.target.value,
              }))
            }
          />
          <Button
            variant="contained"
            sx={{ width: "75%" }}
            onClick={handleLogin}
          >
            {" "}
            Login
          </Button>
          <Typography>Don't have an account?</Typography>
          <a href="/register">Sign Up</a>
        </Stack>
      </Box>
    </Box>
  );
};
