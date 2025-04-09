import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

const Navbar = () => {
    const [active, setActive] = useState('navBar');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Function to toggle navBar
    const showNav = () => {
        setActive('navBar activeNavbar');
    };

    // Function to remove navBar
    const removeNavbar = () => {
        setActive('navBar');
    };

    // Function to update screen width
    const updateDimension = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateDimension);
        
        // Reset navbar state when screen size changes to desktop view
        if (screenWidth >= 769) {
            setActive('navBar');
        }
        
        return () => {
            window.removeEventListener('resize', updateDimension);
        };
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
                            <Link to="/pages" className="navLink">Pages</Link>
                        </li>
                    </ul>
                    <div className="btnContainer">
                        <button className='bookBtn'>
                            <Link to="/book-now">BOOK NOW</Link>
                        </button>
                    </div>
                    <div onClick={removeNavbar} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>
                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    );
}

export default Navbar;