// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import AppleLogin from './AppleLogin.jsx'; // You'll need to create this component

const Navbar = () => {
    const [active, setActive] = useState('navBar');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const showNav = () => setActive('navBar activeNavbar');
    const removeNavbar = () => setActive('navBar');

    const updateDimension = () => {
        setScreenWidth(window.innerWidth);
    };

    const handleGoogleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        setIsLoggedIn(true);
        setUser({
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture
        });
        setShowAuthModal(false);
        localStorage.setItem('travelUser', JSON.stringify(decoded));
    };

    const handleGoogleError = () => {
        console.log('Login Failed');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('travelUser');
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('travelUser');
        if (savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }

        window.addEventListener('resize', updateDimension);
        if (screenWidth >= 769) setActive('navBar');
        
        return () => window.removeEventListener('resize', updateDimension);
    }, [screenWidth]);

    return (
        <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <MdOutlineTravelExplore className="icon"/> 
                        <span>Travel.</span>
                    </Link>
                </div>
                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <Link to="/" className="navLink">Home</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/kenyan-holidays" className="navLink">Kenyan Holidays</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/international-holidays" className="navLink">International Holidays</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/mycart" className="navLink">MyCart</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/summary" className="navLink">Summary</Link>
                        </li>
                    </ul>
                    <div className="btnContainer">
                        {isLoggedIn ? (
                            <div className="userProfile">
                                <img src={user.picture} alt={user.name} className="profilePic" />
                                <span className="userName">{user.name}</span>
                                <button onClick={handleLogout} className="logoutBtn">Logout</button>
                            </div>
                        ) : (
                            <button className='authBtn' onClick={() => setShowAuthModal(true)}>
                                Login/Sign Up
                            </button>
                        )}
                    </div>
                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>
                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </header>

            {showAuthModal && (
                <div className="authModal">
                    <div className="modalContent">
                        <h3>Login or Sign Up</h3>
                        <div className="authProviders">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                useOneTap
                            />
                            <AppleLogin />
                        </div>
                        <button className="closeModal" onClick={() => setShowAuthModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Navbar;