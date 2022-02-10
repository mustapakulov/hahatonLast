import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { tiketContext } from "../MyContext/MyContext";
import { Badge, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import "../Cart/cart.css";
import { blue } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import logo from "./img/tesla.png";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ChatIcon from "@mui/icons-material/Chat";

const color = blue[50];

function Navbar(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

Navbar.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function MyNavbar(props) {
  const { cartLength, useAuth, logout } = useContext(tiketContext);
  const currentUser = useAuth();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <Link to="/">
              <Typography variant="h6" component="div">
                <img src={logo} width="100" alt="logo" />
              </Typography>
            </Link>
          </div>
          <Box sx={{ display: "contents" }}>
            <Link to="/list">
              <IconButton color="inherit" sx={{ alignItems: "center", m: "3" }}>
                <DirectionsCarIcon
                  sx={{ color: "text.secondary" }}
                  fontSize="large"
                />
              </IconButton>
            </Link>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              {" "}
              <Badge badgeContent={cartLength} color="secondary">
                <LocalGroceryStoreIcon
                  sx={{ color: "text.secondary" }}
                  style={{ marginRight: "10px" }}
                  fontSize="large"
                />
              </Badge>
            </Link>
            <Link to="/chat">
              <IconButton color="inherit" sx={{ alignItems: "center", m: "3" }}>
                <ChatIcon
                  sx={{ color: "text.secondary" }}
                  fontSize="large"
                />
              </IconButton>
            </Link>
            <Link to="/favorite">
              <IconButton>
                <FolderSpecialIcon
                  fontSize="large"
                  sx={{ color: "text.secondary" }}
                  style={{ marginRight: "10px" }}
                />
              </IconButton>
            </Link>
            <Typography style={{ color: "black" }} variant="h6" component="div">
              {currentUser?.email.substring(0, currentUser.email.length - 10)}
              {currentUser ? (
                <Link to="/login">
                  <AccountCircleIcon
                    sx={{ color: "text.secondary" }}
                    fontSize="large"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <AccountCircleIcon
                    sx={{ color: "text.secondary" }}
                    fontSize="large"
                  />
                </Link>
              )}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" sx={{ m: 1 }} />
      <Navbar {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Navbar>
    </React.Fragment>
  );
}
