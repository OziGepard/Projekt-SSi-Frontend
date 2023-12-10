import { Box, Button } from "@mui/material";
import SearchBar from "./Search/SearchBar";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ searchShown }: { searchShown?: boolean }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  

  return (
    <Box
      sx={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
        gap: "1rem",
      }}
    >
      {searchShown && <SearchBar type="movies" />}
      <Button
        variant="text"
        sx={{ fontSize: "16px" }}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation("/");
        }}
      >
        Home
      </Button>
      <Button
        variant="text"
        sx={{ fontSize: "16px" }}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation("/login");
        }}
      >
        Log In
      </Button>
      <Button
        variant="text"
        sx={{ fontSize: "16px" }}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation("/register");
        }}
      >
        Sign Up
      </Button>
      <Button
        variant="text"
        sx={{ fontSize: "16px" }}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation("/admin_panel");
        }}
      >
        Admin Panel
      </Button>
    </Box>
  );
};
