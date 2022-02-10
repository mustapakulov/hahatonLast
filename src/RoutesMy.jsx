import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Cart from "./components/Cart/Cart";
import Creditcard from "./components/CreditCard/CreditCard";
import AddTicket from "./components/CRUT/AddTicket/AddTicket";
import DisplayCard from "./components/CRUT/DisplayCard/DisplayCard";
import DisplayList from "./components/CRUT/DisplayList/DisplayList";
import EditTiket from "./components/CRUT/EditTiket/EditTiket";
import MyContextProvider from "./components/MyContext/MyContext";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import Comments from "./components/Comments/Commetns";
import Chat from "./components/Chat/Chat";

const MyRoutes = () => {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddTicket />} />
          <Route path="/login" element={<Login />} />
          <Route path="/display" element={<DisplayCard />} />
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<DisplayList />} />
          <Route path="/list/edit/:id" element={<EditTiket />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/credit" element={<Creditcard />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/chat" element={<Chat />}/>
        </Routes>
      </BrowserRouter>
    </MyContextProvider>
  );
};

export default MyRoutes;
