import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPanel = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorResponse, setErrorResponse] = useState(null)

  const navigate = useNavigate()

  const register = async () => {
      const response = await axios.post(
        "http://localhost:4567/user/register",
        {
          username: userCredentials.username,
          password: userCredentials.password,
          passwordRepeated: userCredentials.confirmPassword,
         }
      )
      .then(response => {
        if (response.status === 201) {
          localStorage.setItem('userToken', response.data.message)
          console.log(response.data.message)
          navigate('/')
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          setErrorResponse(error.response.data)
        }
      })
  }

  const handleRegister = () => {
    register();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          alignItems: "center",
          gap: "1.5rem",
          boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
          borderRadius: "25px",
          padding: "2rem",
        }}
      >
        <h2>Sign Up</h2>
        <Stack sx={{ rowGap: "2rem", alignItems: "center" }}>
          <TextField
            placeholder="Username"
            label="Username"
            type="text"
            sx={{ height: "2rem", borderRadius: "25px" }}
            onChange={(e) =>
              setUserCredentials((prevValue) => ({
                ...prevValue,
                username: e.target.value,
              }))
            }
          />
          <TextField
            placeholder="Email"
            label="Email"
            type="email"
            sx={{ height: "2rem", borderRadius: "25px" }}
            onChange={(e) =>
              setUserCredentials((prevValue) => ({
                ...prevValue,
                email: e.target.value,
              }))
            }
          />
          <TextField
            placeholder="*******"
            label="Password"
            type="password"
            sx={{ height: "2rem", borderRadius: "25px" }}
            onChange={(e) =>
              setUserCredentials((prevValue) => ({
                ...prevValue,
                password: e.target.value,
              }))
            }
          />
          <TextField
            placeholder="*******"
            label="Confirm Password"
            type="password"
            sx={{ height: "2rem", borderRadius: "25px" }}
            onChange={(e) =>
              setUserCredentials((prevValue) => ({
                ...prevValue,
                confirmPassword: e.target.value,
              }))
            }
          />
          <Button
            variant="contained"
            onClick={handleRegister}
            sx={{ width: "75%" }}
          >
            {" "}
            SignUp
          </Button>
          <Typography>Already have an account?</Typography>
          <a href="/login">Sign In</a>
          {errorResponse && <Typography>{errorResponse}</Typography>}
        </Stack>
      </Box>
    </Box>
  );
};
