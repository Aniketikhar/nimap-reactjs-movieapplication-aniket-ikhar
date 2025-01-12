import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Details from "./pages/Details";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./store/Slices/moviesSlice";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies({ category: "upcoming" }));
    dispatch(fetchMovies({ category: "popular"}));
    dispatch(fetchMovies({ category: "top_rated" }));
  }, [dispatch]);

  return (
    <div className="bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
