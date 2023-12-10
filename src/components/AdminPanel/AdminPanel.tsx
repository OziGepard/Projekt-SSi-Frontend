import { Box } from "@mui/material";
import { Navbar } from "../Navbar";
import { UserList } from "../UserList/UserList";
import { MoviesList } from "../MoviesList/MoviesList";

export const AdminPanel = () => {
  return (
    <Box sx={{ width: "100vw", display: "flex", flexDirection: "row"}}>
      <Navbar />
      <Box
        sx={{
          my: "auto",
          display: "flex",
          justifyContent: "space-evenly",
          gap: "3rem",
          height:'50%',
          width:'100%'
        }}
      >
        <UserList />
        <MoviesList />
      </Box>
    </Box>
  );
};
