import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './config/auth';
import './app.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Components/Home/Home.jsx';
import KenyanHolidays from './Components/KenyanHolidays/KenyanHoliday.jsx';
import InternationalHolidays from './Components/InternationalHolidays/InternationalHolidays.jsx';
import MyCart from './Components/MyCart/MyCart.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Main from './Components/Main/Main.jsx';
import Summary from '../src/Components/summary/Summary.jsx';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kenyan-holidays" element={<KenyanHolidays />} />
          <Route path="/international-holidays" element={<InternationalHolidays />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;