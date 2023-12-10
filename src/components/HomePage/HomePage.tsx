import { useContext, useEffect, useState } from "react";
import { SingleCard, SingleMovieProps } from "../SingleCard/SingleCard";
import axios from "axios";
import { Box, Button, Paper, Typography } from "@mui/material";
import { AppContext } from "../../App";
import { Navbar } from "../Navbar";

export const HomePage = () => {
  const [movies, setMovies] = useState<SingleMovieProps[]>([]);
  const { moviesFilter: filter } = useContext(AppContext);

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

  return (
    <Box sx={{ width: "100vw", display: "flex", flexDirection: "row" }}>
      <Navbar searchShown/>
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
