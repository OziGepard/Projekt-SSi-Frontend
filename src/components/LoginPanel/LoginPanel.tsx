import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPanel = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()

  const logIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4567/user/login",
        {
          username: userCredentials.username,
          password: userCredentials.password,
         }
      );
      if (response.status === 201 || response.status === 200) {
        localStorage.setItem('userToken', response.data.message)
        console.log(response.data.message)
        navigate('/')
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = () => {
    logIn();
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
