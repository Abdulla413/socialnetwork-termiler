import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
//Redux

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Navbar />

        <section className="container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
