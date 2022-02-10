import * as React from "react";
import { Link } from "react-router-dom";
import "../css/register.css";

import { useNavigate } from "react-router-dom";
import { tiketContext } from "../../MyContext/MyContext";
import { blue } from "@mui/material/colors";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
const color = blue[50];
export default function Login() {
  const { signIn } = React.useContext(tiketContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    handleSignIn(data.get("email"), data.get("password"));
    navigate("/");
  };

  async function handleSignIn(email, password) {
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <CssBaseline />
      <div className="login">
        <div className="loginContainer">
          <Typography component="h1" variant="h5" color={color}>
            Вход в аккаунт
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <p className="errorMsg">Ваш логин:</p>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  sx={{ borderRadius: "50%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <p className="errorMsg">Ваш пароль:</p>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <div className="btnContainer">
              <>
                <Button variant="contained" color="success" type="submit">
                  Вход в аккаунт
                </Button>
              </>
              <>
                <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                  {" "}
                  {/* <p className="labelRegister"> У вас есть аккаунт? </p> */}
                  <Link to="/register">
                    <Button variant="contained" color="success">
                      Регистрация
                    </Button>
                  </Link>{" "}
                </Grid>
              </>
            </div>
          </Box>
        </div>
      </div>
    </Container>
  );
}
