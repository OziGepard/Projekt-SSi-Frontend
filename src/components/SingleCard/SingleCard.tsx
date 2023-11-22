import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useState } from "react";

export type SingleMovieProps = {
  id: number;
  title: string;
  genre: {
    id: number;
    genreName: string;
  };
  releaseDate: string;
  rating: number;
};

export const SingleCard = ({
  id,
  title,
  releaseDate,
  genre,
  rating,
}: SingleMovieProps) => {
  const [liked, setLiked] = useState(false);
  const handleLikeChange = () => {
    setLiked((prev) => !prev);
  };
  return (
    <Box
      component={Paper}
      elevation={4}
      borderRadius={"40px"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        gap: 3,
        width: "15%",
      }}
    >
      <Typography
        sx={{ fontSize: "16px", fontWeight: "bold", textAlign: "center" }}
      >
        {title}
      </Typography>
      <Box sx={{ height: "auto" }}>
        <img
          src={`/movie-pictures/random-pic-${id}.jpg`}
          style={{ maxWidth: "300px", maxHeight: "600px" }}
        />
      </Box>
      <IconButton onClick={handleLikeChange}>
        {!liked ? <ThumbUpOffAltIcon /> : <ThumbUpAltIcon />}
      </IconButton>
    </Box>
  );
};
