import {
  Star,
  Https,
  MilitaryTech,
  LockPerson,
  Key,
  Block,
  Add,
  Edit,
  Delete,
} from "@mui/icons-material";
import {
  Box,
  Paper,
  List,
  ListSubheader,
  ListItemButton,
  ListItem,
  Typography,
  Button,
} from "@mui/material";
import SearchBar from "../Search/SearchBar";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { SingleMovieProps } from "../SingleCard/SingleCard";
import MovieModal from "../MovieModal/MovieModal";

export const MoviesList = () => {
  const [isAddSelected, setAddSetlected] = useState(false);
  const [movies, setMovies] = useState<SingleMovieProps[]>([]);
  const [selectedMovieCredentials, setSelectedMovieCredentials] =
    useState<SingleMovieProps>({
      id: 0,
      title: "",
      releaseDate: "",
      rating: 0.0,
      genre: {
        id: 0,
        genreName: "",
      },
    });
  const { moviesFilter } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleModalModifyClicked = () => {
    if (selectedMovieCredentials.title) {
      setAddSetlected(false);
      handleModalState();
    }
  };
  const handleModalAddClicked = () => {
    setAddSetlected(true);
    handleModalState();
  };

  const handleModalState = () => {
    setOpen((prev) => !prev);
  };

  const filteredData = moviesFilter
    ? movies.filter((movie) => movie.title.includes(moviesFilter))
    : movies;

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

  useEffect(() => {
    getMovies();
  }, []);

  const handleSelectedMovieChange = (movie: SingleMovieProps) => {
    setSelectedMovieCredentials(movie);
  };

  const handleDeleteClick = () => {
    if (selectedMovieCredentials.title) {
      axios
        .delete(
          `http://localhost:4567/admin/movie/${selectedMovieCredentials.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        )
        .then((response) => {
          console.log(`Deleted post with ID ${selectedMovieCredentials.id}`);
          getMovies();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Box
      component={Paper}
      elevation={6}
      borderRadius={"40px"}
      sx={{ height: "100%", display: "flex", flexDirection: "row" }}
    >
      <List
        sx={{
          borderTopLeftRadius: "40px",
          borderBottomLeftRadius: "40px",
          p: "2rem",
        }}
        component={Paper}
        elevation={4}
      >
        <ListSubheader>Manage Movies</ListSubheader>
        <ListSubheader>
          <SearchBar placeholder="Search movies..." type="movies" />
        </ListSubheader>
        <Box sx={{ overflow: "auto", height: "75%", mt: "1rem" }}>
          {filteredData.map((movie) => (
            <ListItemButton
              key={`movie-list-${movie.id}-${movie.title}`}
              sx={{
                backgroundColor:
                  selectedMovieCredentials.id === movie.id ? "beige" : "",
              }}
              onClick={() => {
                handleSelectedMovieChange(movie);
              }}
            >
              <ListItem sx={{ width: "100%", display: "flex" }}>
                <Typography>{movie.title}</Typography>
              </ListItem>
            </ListItemButton>
          ))}
        </Box>
      </List>
      <Box
        sx={{
          mt: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "25%",
          p: 2,
        }}
      >
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Operations
        </Typography>
        <Button
          variant="text"
          onClick={() => {
            handleModalAddClicked();
          }}
        >
          <Add sx={{ mr: "1rem" }} /> Add
        </Button>
        <Button
          variant="text"
          onClick={() => {
            handleDeleteClick();
          }}
        >
          <Delete sx={{ mr: "1rem" }} /> Delete
        </Button>
        <Button
          variant="text"
          onClick={() => {
            handleModalModifyClicked();
          }}
        >
          <Edit sx={{ mr: "1rem" }} /> Modify
        </Button>
        <MovieModal
          handleCloseOrOpen={handleModalState}
          open={open}
          initialData={isAddSelected ? undefined : selectedMovieCredentials}
          isAddSelected={isAddSelected}
        />
      </Box>
    </Box>
  );
};
