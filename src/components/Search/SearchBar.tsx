import { InputAdornment, InputBase, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useContext } from "react";
import { AppContext } from "../../App";

function SearchBar() {
  const { filter, setFilter } = useContext(AppContext);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  return (
    <InputBase
      placeholder="Search videos..."
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
      value={filter}
      onChange={handleValueChange}
    />
  );
}
export default SearchBar;
