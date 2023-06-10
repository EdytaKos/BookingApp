//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Account from "./pages/Account";
import SinglePlace from "./pages/SinglePlace";
import BookingsPage from "./pages/BookingsPage";
import SingleBookingPage from "./pages/SingleBookingPage";
import Layout from "./Layout";
import axios from "axios";
import { useEffect } from "react";
import { UserContextProvider } from "./UserContext.jsx";
import NewPlacePage from "./pages/NewPlacePage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/profile" element={<Account />} />
          <Route path="/account/places" element={<Account />} />
          <Route path="/account/places/new" element={<NewPlacePage />} />
          <Route path="/account/places/:id" element={<NewPlacePage />} />
          <Route path="/place/:id" element={<SinglePlace />}/>
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<SingleBookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
