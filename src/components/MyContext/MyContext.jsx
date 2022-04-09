import React, { createContext, useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase";
import axios from "axios";
import { API, API2 } from "../../Helpers";
import { toast } from "react-toastify";
import { calcTotalPrice, calcSubPrice } from "../../CalcPrice";

export const tiketContext = createContext();

const INIT_STATE = {
  tiket: null,
  edit: null,
  paginatedPages: 1,
  cart: {},
  favorite: {},
  favoriteLength: 0,
  cartLength: 0,
  comments: null,
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_TIKET":
      return {
        ...state,
        tiket: action.payload.data,
        paginatedPages: Math.ceil(action.payload.headers["x-total-count"] / 1),
      };
    case "EDIT_TIKET":
      return { ...state, edit: action.payload };
    case "CHANGE_CART_COUNT":
      return { ...state, cartLength: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    case "GET_FAVORITE":
      return { ...state, favorite: action.payload };
    case "CHANGE_FAVORITE_COUNT":
      return { ...state, favoriteLength: action.payload };
    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "GET_EDIT_COMMENTS":
      return { ...state, edit: action.payload };

    default:
      return state;
  }
};

const MyContext = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // ! create
  const addTiket = async (newTiket) => {
    console.log(newTiket, "123");
    try {
      let res = await axios.post(API, newTiket);
      getTiket();
      toast.success("oops", { icon: "🚀" });
      return res;
    } catch (error) {
      toast.error(error);
    }
  };
  // ! read
  const getTiket = async () => {
    try {
      let res = await axios(`${API}/${window.location.search}`);
      let action = {
        type: "GET_TIKET",
        payload: res,
      };
      dispatch(action);
    } catch (error) {
      // ! Error
    }
  };
  // todo FAVORITE
  const addProductInFavorite = (product) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
        totalPrice: 0,
      };
    }

    let newProduct = {
      item: product,
      count: 1,
      subPrice: 0,
    };

    let filteredFavorite = favorite.products.filter(
      (elem) => elem.item.id === product.id
    );
    if (filteredFavorite.length > 0) {
      favorite.products = favorite.products.filter(
        (elem) => elem.item.id !== product.id
      );
    } else {
      favorite.products.push(newProduct);
    }
    newProduct.subPrice = calcSubPrice(newProduct);
    favorite.totalPrice = calcTotalPrice(favorite.products);
    localStorage.setItem("favorite", JSON.stringify(favorite));
    dispatch({
      type: "CHANGE_FAVORITE_COUNT",
      payload: favorite.products.length,
    });
  };
  const getFavoriteLength = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "CHANGE_FAVORITE_COUNT",
      payload: favorite.products.length,
    });
  };

  const getFavorite = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_FAVORITE",
      payload: favorite,
    });
  };

  const changeFavoriteCount = (count, id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    favorite.products = favorite.products.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    favorite.totalPrice = calcTotalPrice(favorite.products);
    localStorage.setItem("favorite", JSON.stringify(favorite));
    getFavorite();
  };

  const checkProductInFavorite = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
        totalPrice: 0,
      };
    }
    let newFavorite = favorite.products.filter((elem) => elem.item.id === id);
    return newFavorite.length > 0 ? true : false;
  };
  // todo CREATE COMMENT
  const addComment = async (newComment) => {
    console.log(newComment, "123");
    try {
      let res = await axios.post(API2, newComment);
      getComments();
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  // todo DELETE COMMENT
  const deleteComment = async (id) => {
    await axios.delete(`${API2}/${id}`);
    getComments();
  };

  // todo READ COMMENT
  const getComments = async () => {
    try {
      let res = await axios(`${API2}`);
      let action = {
        type: "GET_COMMENTS",
        payload: res.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // todo DELETE FROM FAVORITE

  const deleteFromFavorite = (id, price) => {
    let items = JSON.parse(localStorage.getItem("favorite"));
    for (let i = 0; i < items.products.length; i++) {
      let targetItem = JSON.parse(items.products[i].item.id);
      let targetItemPrice = JSON.parse(items.products[i].item.price);

      if (targetItem === id) {
        items.products.splice(i, 1);
      }
      if (targetItemPrice === price) {
        items.totalPrice = items.totalPrice - price;
      }
    }
    items = JSON.stringify(items);
    console.log(items);
    localStorage.setItem("favorite", items);
    getFavorite();
  };

  // ! edit || update
  const editTiket = async (id) => {
    try {
      let { data } = await axios(`${API}/${id}`);
      let action = {
        type: "EDIT_TIKET",
        payload: data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  // ! save
  const saveEditTiket = async (editedTiket) => {
    try {
      await axios.patch(`${API}/${editedTiket.id}`, editedTiket);
      getTiket();
      toast.success("Успеншно удаленно!", { icon: "🚀" });
    } catch (error) {
      toast.success("Что то пошло не так!", { icon: "🚀" });
    }
  };
  // ! delete
  const deleteTiket = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getTiket();
      toast.success("Успеншно удаленно!", { icon: "🚀" });
    } catch (error) {
      // ! toastify
      toast.success("Что то пошло не так!", { icon: "🚀" });
    }
  };
  // ! cart

  const addCartTiket = (tiket) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        tikets: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      item: tiket,
      count: 1,
      subPrice: 0,
    };
    let filteredCard = cart.tikets.filter((elem) => elem.item.id === tiket.id);
    if (filteredCard.length > 0) {
      cart.tikets = cart.tikets.filter((elem) => elem.item.id === tiket.id);
    } else {
      cart.tikets.push(newProduct);
    }
    newProduct.subPrice = calcSubPrice(newProduct);
    cart.totalPrice = calcTotalPrice(cart.tikets);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "CHANGE_CART_COUNT",
      payload: cart.tikets.length,
    });
  };

  const getCartLength = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        tikets: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "CHANGE_CART_COUNT",
      payload: cart.tikets.length,
    });
  };

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        tikets: [],
        totalPrice: 0,
      };
    }
    // console.log(cart, "cartt");

    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };
  const changeLikeCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.tikets = cart.tikets.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    getCartLength();
    getCart();
  };

  // Like
  const changeTiketCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.tikets = cart.tikets.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.tikets);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartLength();
    getCart();
  };

  const checkTiketInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        tikets: [],
        totalPrice: 0,
      };
    }
    let newcart = cart.tikets.filter((elem) => elem.id === id);
    return newcart.length > 0 ? true : false;
  };

  const deleteFromCart = (id, price) => {
    let items = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < items.tikets.length; i++) {
      let targetItem = JSON.parse(items.tikets[i].item.id);
      let targetItemPrice = JSON.parse(items.tikets[i].item.price);

      if (targetItem === id) {
        items.tikets.splice(i, 1);
      }
      if (targetItemPrice === price) {
        items.totalPrice = items.totalPrice - price;
      }
    }
    items = JSON.stringify(items);
    console.log(items);
    localStorage.setItem("cart", items);
    getCart();
  };

  //  ! signIn/signUp
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      return unsub;
    }, []);
    return currentUser;
  }
  useAuth();
  return (
    <tiketContext.Provider
      value={{
        tiket: state.tiket,
        edit: state.edit,
        //  sign
        signUp,
        signIn,
        logout,
        useAuth,
        // Crud
        addTiket,
        getTiket,
        editTiket,
        saveEditTiket,
        deleteTiket,
        // pagi
        paginatedPages: state.paginatedPages,
        // cart
        cart: state.cart,
        cartLength: state.cartLength,
        addCartTiket,
        getCartLength,
        getCart,
        changeTiketCount,
        checkTiketInCart,
        favorite: state.favorite,
        favoriteLength: state.favoriteLength,
        deleteFromCart,
        //! fav
        addProductInFavorite,
        getFavoriteLength,
        getFavorite,
        changeFavoriteCount,
        checkProductInFavorite,
        deleteFromFavorite,
        addComment,
        getComments,
        deleteComment,
        changeLikeCount,
        comments: state.comments,
      }}
    >
      {props.children}
    </tiketContext.Provider>
  );
};

export default MyContext;
