import * as React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import "../HeadersHome/HeadersHome.css";
import "../Cart/cart.css";
import video from "./vide/pexels.mp4";

const HeadersHome = () => {
  return (
    <div className="wrapper" >
      <TextField
        id="input-with-icon-textfield"
        placeholder="Поиск"
    
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SavedSearchIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
       <video src={video} autoPlay loop muted></video>
    </div>
  );
};

export default HeadersHome;
