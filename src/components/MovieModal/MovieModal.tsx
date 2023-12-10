import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { MenuItem, Select, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { SingleMovieProps } from "../SingleCard/SingleCard";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface MovieModalProps {
  handleCloseOrOpen: () => void;
  open: boolean;
  initialData?: SingleMovieProps;
  isAddSelected: boolean;
}

type Genre = {
  id: number;
  genreName: string;
};

const MovieModal: React.FC<MovieModalProps> = ({
  handleCloseOrOpen: handleClose,
  open,
  initialData,
  isAddSelected,
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDisplaySnackbar = () => {
    setSnackbarOpen(true);
  };

  React.useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDate(initialData.releaseDate?.substring(0, 10) || "");
      setRating(initialData.rating || 0);
      setGenre(initialData.genre?.id || 0);
    }
  }, [initialData]);

  React.useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:4567/genre");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleSave = () => {
    console.log("Title:", title);
    console.log("Date:", date);
    console.log("Rating:", rating);
    console.log("Genre:", genre);

    if (isAddSelected) {
      axios
        .post(
          "http://localhost:4567/admin/movie",
          {
            title: title,
            releaseDate: date,
            rating: rating,
            genre: {
              id: genre,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        )
        .then(() => {
          setSnackbarMessage("Film został dodany pomyślnie");
          handleDisplaySnackbar();
        })
        .catch((error) => {
          if (error.response.status === 500) {
            setSnackbarMessage("Uzupełnij brakujące pola");
          } else if (error.response.status === 404) {
            setSnackbarMessage("Popraw wprowadzone dane");
          }
          handleDisplaySnackbar();
        });
    } else {
      axios.put(
        "http://localhost:4567/admin/movie",
        {
          id: initialData?.id,
          title: title,
          releaseDate: date,
          rating: rating,
          genre: {
            id: genre,
            genreName: initialData?.genre.genreName,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(() => {
        setSnackbarMessage("Film został zaktualizowany pomyślnie");
        handleDisplaySnackbar();
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setSnackbarMessage("Uzupełnij brakujące pola");
        } else if (error.response.status === 404) {
          setSnackbarMessage("Popraw wprowadzone dane");
        }
        handleDisplaySnackbar();
      });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="div">
          {isAddSelected ? "Dodaj nowy film" : "Modyfikuj film"}
          </Typography>
          <TextField
            label="Tytuł filmu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Data produkcji (yyyy-mm-dd)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ocena (1.0-5.0)"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            fullWidth
            margin="normal"
          />
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
          <Select
            label="Gatunek"
            value={genre}
            onChange={(e) => {
              if (typeof e.target.value === "string") {
                setGenre(parseInt(e.target.value));
              } else {
                setGenre(e.target.value);
              }
            }}
            fullWidth
            margin="dense"
          >
            {genres.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.genreName}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleSave}>
            Zapisz
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MovieModal;
