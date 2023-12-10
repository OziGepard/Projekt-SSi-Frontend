import { InputAdornment, InputBase, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useContext } from "react";
import { AppContext } from "../../App";

function SearchBar({
  placeholder = "Search videos...",
  type,
}: {
  placeholder?: string;
  type: "users" | "movies";
}) {
  const { userFilter, moviesFilter, setUserFilter, setMoviesFilter } = useContext(AppContext);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    type === 'movies' ? setMoviesFilter(e.target.value) : setUserFilter(e.target.value);
  };
  return (
    <InputBase
      placeholder={placeholder}
      sx={{
        backgroundColor: "white",
        borderRadius: "60px",
        py: 1,
        pl: "12px",
        border: "1px solid black",
      }}
      startAdornment={
        <InputAdornment position="start">
          <Search color="primary" />
        </InputAdornment>
      }
      value={type === 'users' ? userFilter : moviesFilter}
      onChange={handleValueChange}
    />
  );
}
export default SearchBar;
