import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CommentCard from "./CommentCard";
import { tiketContext } from "../MyContext/MyContext";
import { useEffect } from "react";
import"../Comments/Comments.css"


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));

export default function CommentsList() {
  const { comments, getComments } = React.useContext(tiketContext);

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "darkblue" }}>Добавить отзыв</h1>
      <Box
        sx={{ flexGrow: 1, margin: 4, marginTop: 1 }}
        style={{ backgroundColor: "#ffff" }}
      >
        <Grid
          
          style={{width:"100%", display: "block", justifyContent: "center" }}
        >
          {comments ? (
            comments.map((item, index) => (
              <Grid item xs={2} sm={4} md={2} key={index}>
                <CommentCard item={item} key={index} />
              </Grid>
            ))
          ) : (
            <h1>загрузка...</h1>
          )}
        </Grid>
      </Box>
    </>
  );
}
