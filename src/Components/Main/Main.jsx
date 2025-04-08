import React from "react";
import './main.scss'; // Changed from .css to .scss
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {HiOutlineClipboardCheck} from 'react-icons/hi';

// Corrected image imports (remove spaces from filenames)
import img1 from '../../Assets/img1.jpg';
import img2 from '../../Assets/img2.jpg';
import img3 from '../../Assets/img3.jpg';
import img4 from '../../Assets/img4.jpg';
import img5 from '../../Assets/img5.jpg';
import img6 from '../../Assets/img6.jpg';
import img7 from '../../Assets/img7.jpg';
import img8 from '../../Assets/img8.jpg';
import img9 from '../../Assets/img9.jpg';

const data = [ // Changed from Data to data (to match usage)
    {
        id: 1,
        imgSrc: img1,
        destTitle: "Bora Bora",
        location: "New Zealand",
        grade: "Cultural Relax",
        fees: "$700",
        description: "The epitome of romance, Bora Bora is a tropical paradise with stunning turquoise waters, luxurious overwater bungalows, and breathtaking sunsets."
    },
    {
        id: 2,
        imgSrc: img2,
        destTitle: "Machu Picchu",
        location: "Peru",
        grade: "Cultural Relax",
        fees: "$600",
        description: "Huayna Picchu is an ancient Incan citadel nestled in the Andes Mountains. It's a UNESCO World Heritage site with breathtaking views and rich history."
    },
    {
        id: 3,
        imgSrc: img3,
        destTitle: "Great Wall",
        location: "China",
        grade: "Cultural Relax",
        fees: "$700",
        description: "The Great Wall of China is a UNESCO World Heritage site and one of the most iconic landmarks in the world, offering stunning views and rich history."
    },
    {
        id: 4,
        imgSrc: img4,
        destTitle: "Grand Canyon",
        location: "USA",
        grade: "Cultural Relax",
        fees: "$700",
        description: "The Grand Canyon is a natural wonder that offers breathtaking views, hiking trails, and opportunities for adventure."
    },
    {
        id: 5,
        imgSrc: img5,
        destTitle: "Eiffel Tower",
        location: "France",
        grade: "Cultural Relax",
        fees: "$700",
        description: "The Eiffel Tower is an iconic symbol of Paris, offering stunning views of the city and a chance to experience the romance of Paris."
    },
    {
        id: 6,
        imgSrc: img6,
        destTitle: "Santorini",
        location: "Greece",
        grade: "Cultural Relax",
        fees: "$700",
        description: "Santorini is a stunning island in Greece known for its white-washed buildings, crystal-clear waters, and breathtaking sunsets."
    },
    {
        id: 7,
        imgSrc: img7,
        destTitle: "Bali Island",
        location: "Indonesia",
        grade: "Cultural Relax",
        fees: "$500",
        description: "Bali Island is a tropical paradise known for its stunning beaches, lush landscapes, and vibrant culture."
    },
    {
        id: 8,
        imgSrc: img8,
        destTitle: "Great Barrier Reef",
        location: "Australia",
        grade: "Cultural Relax",
        fees: "$700",
        description: "The Great Barrier Reef is the world's largest coral reef system, offering stunning marine life and vibrant coral reefs."
    },
    {
        id: 9,
        imgSrc: img9,
        destTitle: "Cappadocia",
        location: "Turkey",
        grade: "Cultural Relax",
        fees: "$600",
        description: "Cappadocia is a unique region in Turkey known for its surreal landscapes, fairy chimneys, and ancient cave dwellings."
    }
];

const Main = () => {
    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 className="title">
                    Most Visited Destinations
                </h3>
            </div>

            <div className="secContent grid">
                {data.map(({ id, imgSrc, destTitle, location, grade, fees, description }) => { 
                    return (
                        <div className="singleDestination" key={id}>
                            <div className="imageDiv">
                                <img src={imgSrc} alt={destTitle} />
                            </div>
                            <div className="cardInfo">
                                <h4 className="destTitle">{destTitle}</h4>
                                <span className="continent flex">
                                    <HiOutlineLocationMarker className="icon" />
                                    <span className="name">{location}</span>
                                </span>
                                <div className="fees flex">
                                    <div className="grade">
                                        <span>{grade} <small>+1</small></span>
                                    </div>
                                    <div className="price">
                                        <h5>{fees}</h5>
                                    </div>
                                </div>
                                <div className="desc">
                                    <p>{description}</p>
                                </div>
                                <button className="btn flex">
                                    DETAILS <HiOutlineClipboardCheck className="icon" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Main;