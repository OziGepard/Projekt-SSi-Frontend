import { useContext, useEffect, useState } from "react";
import { SingleCard, SingleMovieProps } from "../SingleCard/SingleCard";
import axios from "axios";
import { Box, Button, Paper, Typography } from "@mui/material";
import { AppContext } from "../../App";
import SearchBar from "../Search/SearchBar";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const [movies, setMovies] = useState<SingleMovieProps[]>([]);
  const { filter } = useContext(AppContext);
  const navigate = useNavigate();

  const filteredData = filter
    ? movies.filter((movie) => movie.title.includes(filter))
    : movies;

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get<SingleMovieProps[]>(
          "http://localhost:4567/movie"
        );
        if (response.status === 200) {
          setMovies(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getMovies();
  });

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ width: "100vw", display: "flex", flexDirection: "row" }}>
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
        <SearchBar />
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
      </Box>
      <Box
        component={Paper}
        sx={{
          backgroundColor: "gray",
          paddingTop: "8rem",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3rem",
            ml: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {filteredData?.map((movie) => (
            <SingleCard key={movie.id} {...movie} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
