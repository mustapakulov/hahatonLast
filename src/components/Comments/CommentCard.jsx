import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { tiketContext } from "../MyContext/MyContext";
import "../Comments/Comments.css";

export default function CommentCard({ item }) {
  const { deleteComment, useAuth, getComment } = React.useContext(tiketContext);
  function ucFirst(str) {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }

  const currentUser = useAuth();
  let icons = (
    <CardActions
      disableSpacing
      style={{ display: "flex", justifyContent: "right" }}
    >
      {currentUser?.email === "admin@mail.ru" ? (
        <>
          <CardActions disableSpacing>
            <IconButton onClick={() => deleteComment(item.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </>
      ) : (
        <IconButton aria-label="share">
          <FavoriteIcon />
        </IconButton>
      )}
    </CardActions>
  );
  return (
    <Card sx={{ maxWidth: 2000, maxHeight: 180 }}>
      {/* <Link to={/detail/${item.id}} style={{textDecoration: 'none', color: 'black'}}> */}
      <CardContent>
        <Typography
          marginBottom="7px"
          variant="body2"
          color="darkblue"
          fontSize="16px"
        >
          {ucFirst(item.comment)}
        </Typography>
        <div className="titleName">
          <p fontSize="18px" style={{ paddingRight: "10px" }}>
            Имя:
          </p>
          <Typography
            marginBottom="7px"
            variant="succsess"
            color="darkblue"
            fontSize="16px"
            align="right"
            
          >
            {ucFirst(item.name)}
          </Typography>
        </div>
        <CardContent>{icons}</CardContent>
      </CardContent>
    </Card>
  );
}
