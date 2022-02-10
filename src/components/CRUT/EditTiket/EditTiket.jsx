import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { tiketContext } from "../../MyContext/MyContext";

const EditTiket = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { edit, editTiket, saveEditTiket } = useContext(tiketContext);
  const [values, setValues] = useState({
    photo: "",
    town: "",
    price: "",
    describetion: "",
  });
  useEffect(() => {
    editTiket(id);
  }, [id]);

  useEffect(() => {
    if (edit) setValues(edit);
  }, [edit]);

  const handleInp = (event) => {
    let obj = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(obj);
  };

  const handleSave = () => {
    saveEditTiket(values);
    navigate("/list");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: "40px auto",
          maxWidth: 1000,
          height: "auto",
          p: "10px",
          backgroundImage: `url(${"https://images.unsplash.com/photo-1566625147574-b1cf1ff6cf7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"})`,
          backgroundSize: "cover",
        },
      }}
    >
      <Paper elevation={3}>
        <h1 style={{ textAlign: "center", color: "yellow" }}>Add product</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            color: "black",
          }}
        >
          <div
            style={{
              width: "450px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <form
              noValidate
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <TextField
                style={{ padding: "5px" }}
                name="photo"
                onChange={handleInp}
                value={values.photo}
                variant="outlined"
                label="Src"
              />
              <TextField
                style={{ padding: "5px" }}
                name="town"
                onChange={handleInp}
                value={values.town}
                variant="outlined"
                label="Town"
              />
              <TextField
                style={{ padding: "5px" }}
                name="price"
                onChange={handleInp}
                value={values.price}
                variant="outlined"
                label="Price"
              />
              <TextField
                style={{ padding: "5px" }}
                name="describetion"
                onChange={handleInp}
                value={values.describetion}
                variant="outlined"
                label="Describetion"
              />
            </form>
            <Button onClick={handleSave} variant="contained" color="success">
              Save{" "}
            </Button>
          </div>
        </div>
      </Paper>
    </Box>
  );
};
export default EditTiket;
