import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/search/:movieId" element={<Search />} />
        <Route path="/movies/:movieId/:top" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
