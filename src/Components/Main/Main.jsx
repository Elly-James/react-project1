import React from "react";
import './main.scss';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {HiOutlineClipboardCheck} from 'react-icons/hi';

// Image imports
import img1 from '../../Assets/img1.jpg';
import img2 from '../../Assets/img2.jpg';
import img3 from '../../Assets/img3.jpg';
import img4 from '../../Assets/img4.jpg';
import img5 from '../../Assets/img5.jpg';
import img6 from '../../Assets/img6.jpg';
import img7 from '../../Assets/img7.jpg';
import img8 from '../../Assets/img8.jpg';
import img9 from '../../Assets/img9.jpg';

const data = [
    {
        id: 1,
        imgSrc: img1,
        destTitle: "Bora Bora",
        location: "New Zealand",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "The epitome of romance, Bora Bora is one of the best travel destinations in the World. This place is known for its luxurious stays and adventurous activities."
    },
    {
        id: 2,
        imgSrc: img2,
        destTitle: "Machu Picchu",
        location: "Peru",
        grade: "CULTURAL RELAX",
        fees: "$600",
        description: "Huayna Picchu is a mountain in Peru, rising over Machu Picchu, the so-called Lost City of Incas. This place is popular among tourists as the sunrise from the Sun Gate is simply spectacular."
    },
    {
        id: 3,
        imgSrc: img3,
        destTitle: "Great Barrier Reef",
        location: "Australia",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "One of the most remarkable Australian natural gifts is the Great Barrier Reef. The hallmark of this place is 'lavish' and 'beauty'. Always interesting to be in this place."
    },
    {
        id: 4,
        imgSrc: img4,
        destTitle: "Grand Canyon",
        location: "USA",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "The Grand Canyon is a natural wonder that offers breathtaking views, hiking trails, and opportunities for adventure."
    },
    {
        id: 5,
        imgSrc: img5,
        destTitle: "Eiffel Tower",
        location: "France",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "The Eiffel Tower is an iconic symbol of Paris, offering stunning views of the city and a chance to experience the romance of Paris."
    },
    {
        id: 6,
        imgSrc: img6,
        destTitle: "Santorini",
        location: "Greece",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "Santorini is a stunning island in Greece known for its white-washed buildings, crystal-clear waters, and breathtaking sunsets."
    },
    {
        id: 7,
        imgSrc: img7,
        destTitle: "Bali Island",
        location: "Indonesia",
        grade: "CULTURAL RELAX",
        fees: "$500",
        description: "Bali Island is a tropical paradise known for its stunning beaches, lush landscapes, and vibrant culture."
    },
    {
        id: 8,
        imgSrc: img8,
        destTitle: "Great Barrier Reef",
        location: "Australia",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "The Great Barrier Reef is the world's largest coral reef system, offering stunning marine life and vibrant coral reefs."
    },
    {
        id: 9,
        imgSrc: img9,
        destTitle: "Cappadocia",
        location: "Turkey",
        grade: "CULTURAL RELAX",
        fees: "$600",
        description: "Cappadocia is a unique region in Turkey known for its surreal landscapes, fairy chimneys, and ancient cave dwellings."
    }
];

const Main = () => {
    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent">
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