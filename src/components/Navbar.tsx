import { Box, Button } from "@mui/material";
import SearchBar from "./Search/SearchBar";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ searchShown }: { searchShown?: boolean }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const userRole = localStorage.getItem("userRole");
  const loggedIn: boolean = localStorage.getItem("userToken") !== null;

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
      {loggedIn ? null : (
        <>
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
        </>
      )}
      {userRole === "ADMIN" ? (
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
      ) : null}
      {loggedIn ? (
        <Button
          variant="text"
          sx={{ fontSize: "16px" }}
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("userToken");
            localStorage.removeItem("userRole");
            handleNavigation("/");
          }}
        >
          Log out
        </Button>
      ) : null}
    </Box>
  );
};
