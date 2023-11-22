import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const RegisterPanel = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //TODO: submit to backend
  const handleSignUp = () => {
    //sendRequest(userCredentials)
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
                username: e.target.value,
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
                password: e.target.value,
              }))
            }
          />
          <Button
            variant="contained"
            onClick={handleSignUp}
            sx={{ width: "75%" }}
          >
            {" "}
            SignUp
          </Button>
          <Typography>Already have an account?</Typography>
          <a href="/login">Sign In</a>
        </Stack>
      </Box>
    </Box>
  );
};
