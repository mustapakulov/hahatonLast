import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import "../HeadersHome/HeadersHome.css";
import "../Cart/cart.css";
import { Link } from "react-router-dom";

const FooterFot = () => (
  <>
    <AppBar position="static" elevation={0} component="footer">
      <Toolbar style={{ justifyContent: "space-between", margin: "20px" }}>
        <ul>
          <li>
            <AccountBoxIcon sx={{ color: "text.secondary" }} />
            <span>Связь с нами</span>
          </li>
          <li>
            <YouTubeIcon sx={{ color: "text.secondary" }} />
            <span>YouTube</span>
          </li>
        </ul>
        <Typography variant="caption">©2020</Typography>
        <ul>
          <li>
            <TwitterIcon sx={{ color: "text.secondary" }} />
            <span>Twitter</span>
          </li>
          <li>
            
            <Link to="/comments">Оставить отзыв</Link>
          </li>{" "}
          <li>
            <SupportAgentIcon sx={{ color: "text.secondary" }} />
            <span>Служба подержки</span>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  </>
);

export default FooterFot;
