import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/Home';
import DashBoardPage from './pages/DashBoard';
import CoinPage from './pages/Coin';
import ComparePage from "./pages/Compare";
import WatchListPage from "./pages/WatchList"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/dashboard' element={<DashBoardPage/>} />
          <Route path='/coin/:id' element={<CoinPage/>} />
          <Route path='/compare' element={<ComparePage />} />
          <Route path='/watchlist' element={<WatchListPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;