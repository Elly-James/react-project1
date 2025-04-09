import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Components/Home/Home.jsx';
import KenyanHolidays from './Components/KenyanHolidays/KenyanHoliday.jsx';
import InternationalHolidays from './Components/InternationalHolidays/InternationalHolidays.jsx';
import MyCart from './Components/MyCart/MyCart.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Main from './Components/Main/Main.jsx'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kenyan-holidays" element={<KenyanHolidays />} />
        <Route path="/international-holidays" element={<InternationalHolidays />} />
        <Route path="/mycart" element={<MyCart />} />
        
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;