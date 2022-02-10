import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { tiketContext } from "../../MyContext/MyContext";
import { useNavigate } from "react-router-dom";

const AddTicket = () => {
  const [values, setValues] = useState({
    photo: "",
    town: "",
    price: "",
    describetion: "",
  });
  const { addTiket } = useContext(tiketContext);
  console.log(addTiket, "tiket");
  const navigate = useNavigate();

  const handleInp = (event) => {
    let obj = {
      ...values,
      [event.target.name]: event.target.value,
    };
    setValues(obj);
  };
  const handleSave = () => {
    addTiket({ ...values, price: +values.price });
    navigate("/list");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: "40px auto",
          maxWidth: "auto",
          height: "auto",
          p: "10px",
          backgroundImage: `url(${"https://images.izi.ua/12685727"})`,
          backgroundSize: "cover",
        },
      }}
    >
      <Paper elevation={3}>
        <h1 style={{ textAlign: "center", color: "black",padding:'40px', }}>Add product</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            color: "black",
          }}
        >
          <div
            style={{
              width: "1000px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              paddingBottom:"40px",
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
                style={{ padding: "10px" }}
                name="photo"
                onChange={handleInp}
                value={values.photo}
                variant="outlined"
                label="Src"
              />
              <TextField
                style={{ padding: "10px" }}
                name="town"
                onChange={handleInp}
                value={values.town}
                variant="outlined"
                label="Car"
              />
              <TextField
                style={{ padding: "10px" }}
                name="price"
                onChange={handleInp}
                value={values.price}
                variant="outlined"
                label="Price"
              />
              <TextField
                style={{ padding: "10px" }}
                name="describetion"
                onChange={handleInp}
                value={values.describetion}
                variant="outlined"
                label="Describetion"
              />
            </form>
            <Button  onClick={handleSave} variant="contained" color="success">
              Add{" "}
            </Button>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default AddTicket;
