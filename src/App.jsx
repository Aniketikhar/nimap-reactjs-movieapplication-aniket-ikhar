import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Details from './pages/Details'
import Search from './pages/Search'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from './store/Slices/moviesSlice'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies("upcoming"));
    dispatch(fetchMovies("popular"));
    dispatch(fetchMovies("top_rated"));
  }, [dispatch]);

  return (
    <div className='bg-gray-900'>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </div>
  )
}

export default App
