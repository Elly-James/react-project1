import React, { useState, useEffect } from 'react';
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
                    <a href="#" className="logo flex">
                        <MdOutlineTravelExplore className="icon"/> 
                        <span>Travel.</span>
                    </a>
                </div>
                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href="#" className="navLink">Home</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Packages</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Shop</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">About</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Pages</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">News</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Contact</a>
                        </li>
                    </ul>
                    <div className="btnContainer">
                        <button className='bookBtn'>
                            <a href="#">BOOK NOW</a>
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