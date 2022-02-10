import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Box, Button, Grid, Pagination, Slider, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tiketContext } from "../../MyContext/MyContext";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import "../../Cart/cart.css";
import DisplayCard from "../DisplayCard/DisplayCard";
import "../DisplayList/DisplayList.css"




const DisplayList = () => {
  const navigate = useNavigate();
  const { tiket, getTiket, paginatedPages } = useContext(tiketContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = React.useState(
    searchParams.get("q") ? searchParams.get("q") : ""
  );
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(
    searchParams.get("_page") ? searchParams.get("_page") : 1
  );
  // pagi
  useEffect(() => {
    getTiket();
  }, []);
  useEffect(() => {
    setSearchParams({
      _limit: limit,
      _page: page,
    });
  }, [limit, page]);
  const handlePage = (e, pageVal) => {
    setSearchParams({ _page: pageVal, _limit: limit });
    getTiket();
    setPage(pageVal);
  };
  // search
  React.useEffect(() => {
    setSearchParams({
      q: searchVal,
      _limit: 1,
      _page: 0,
    });
  }, [searchVal]);

  const handleValue = (e) => {
    const search = new URLSearchParams(window.location.search);
    search.set("q", e.target.value);
    setSearchParams({
      q: searchVal,
      _limit: 1,
      _page: 0,
    });
    setSearchVal(e.target.value);
    getTiket();
  };
  // price
  const search = new URLSearchParams(window.location.search);
  const [price, setPrice] = useState(search.get("price_lte") || "");
  const filterPriceTiket = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setPrice(search.get("price_lte") || "");
  };
  const resetFilter = () => {
    navigate("/list");
    setPrice("");
    getTiket();
  };

  return (
    <Box sx={{ flexGrow: 1, margin: 5, marginTop: "90px" }} className="baha">
      <div>
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search"
          value={searchVal}
          onChange={handleValue}
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
        <Grid style={{ width: "100px" }}>
          <Slider
            onChange={(e) => filterPriceTiket("price_lte", e.target.value)}
            valueLabelDisplay="auto"
            max={500000}
            step={10}
          />
        </Grid>
        <Button
          onClick={resetFilter}
          color="success"
          style={{
            width: "100px",
            color: "#F8F8FF",
            backgroundColor: "#708090",
            borderRadius: "4px",
          }}
        >
          Сбросить
        </Button>
      </div>
      <Grid
        container
        // spacing={{ xs: 2, }}
        // columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {tiket ? (
          tiket.map((item, index) => (
            <Grid item 
            xs={10} 
            
            key={index}>
              <DisplayCard 
                className="cardDisplay"
                 item={item} key={index} />
            </Grid>
          ))
        ) : (
          <h1>Loading....</h1>
        )}
      </Grid>
      <Stack
        spacing={2}
        style={{
          alignItems: "center",
        }}
      >
        <Pagination count={paginatedPages} onChange={handlePage} page={+page} />
      </Stack>
    </Box>
  );
};

export default DisplayList;
