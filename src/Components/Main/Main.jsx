import React, { useState } from "react";
import './main.scss';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {HiOutlineClipboardCheck} from 'react-icons/hi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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

// Initial data with sample reviews
const initialData = [
    {
        id: 1,
        imgSrc: img1,
        destTitle: "Bora Bora",
        location: "New Zealand",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "The epitome of romance, Bora Bora is one of the best travel destinations in the World. This place is known for its luxurious stays and adventurous activities.",
        reviews: [
            { id: 1, user: "TravelLover22", rating: 5, comment: "Absolutely breathtaking views!" },
            { id: 2, user: "AdventureSeeker", rating: 4, comment: "Great experience, but a bit crowded." }
        ]
    },
    {
        id: 2,
        imgSrc: img2,
        destTitle: "Machu Picchu",
        location: "Peru",
        grade: "CULTURAL RELAX",
        fees: "$600",
        description: "Huayna Picchu is a mountain in Peru, rising over Machu Picchu, the so-called Lost City of Incas. This place is popular among tourists as the sunrise from the Sun Gate is simply spectacular.",
        reviews: [
            { id: 1, user: "HistoryBuff", rating: 5, comment: "A once in a lifetime experience!" }
        ]
    },
    {
        id: 3,
        imgSrc: img3,
        destTitle: "Great Barrier Reef",
        location: "Australia",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "One of the most remarkable Australian natural gifts is the Great Barrier Reef. The hallmark of this place is 'lavish' and 'beauty'. Always interesting to be in this place.",
        reviews: [
            { id: 1, user: "DiverDan", rating: 5, comment: "Incredible marine life!" },
            { id: 2, user: "EcoTraveler", rating: 3, comment: "Beautiful but concerned about coral bleaching." }
        ]
    },
    {
        id: 4,
        imgSrc: img4,
        destTitle: "Grand Canyon",
        location: "USA",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "The Grand Canyon is a natural wonder that offers breathtaking views, hiking trails, and opportunities for adventure.",
        reviews: []
    },
    {
        id: 5,
        imgSrc: img5,
        destTitle: "Eiffel Tower",
        location: "France",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "The Eiffel Tower is an iconic symbol of Paris, offering stunning views of the city and a chance to experience the romance of Paris.",
        reviews: [
            { id: 1, user: "ParisLover", rating: 4, comment: "The view from the top is worth the wait!" }
        ]
    },
    {
        id: 6,
        imgSrc: img6,
        destTitle: "Santorini",
        location: "Greece",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "Santorini is a stunning island in Greece known for its white-washed buildings, crystal-clear waters, and breathtaking sunsets.",
        reviews: [
            { id: 1, user: "IslandHopper", rating: 5, comment: "Most beautiful sunsets I've ever seen!" }
        ]
    },
    {
        id: 7,
        imgSrc: img7,
        destTitle: "Bali Island",
        location: "Indonesia",
        grade: "CULTURAL RELAX",
        fees: "$500",
        description: "Bali Island is a tropical paradise known for its stunning beaches, lush landscapes, and vibrant culture.",
        reviews: []
    },
    {
        id: 8,
        imgSrc: img8,
        destTitle: "Great Barrier Reef",
        location: "Australia",
        grade: "CULTURAL RELAX",
        fees: "$700",
        description: "The Great Barrier Reef is the world's largest coral reef system, offering stunning marine life and vibrant coral reefs.",
        reviews: []
    },
    {
        id: 9,
        imgSrc: img9,
        destTitle: "Cappadocia",
        location: "Turkey",
        grade: "CULTURAL RELAX",
        fees: "$600",
        description: "Cappadocia is a unique region in Turkey known for its surreal landscapes, fairy chimneys, and ancient cave dwellings.",
        reviews: [
            { id: 1, user: "HotAirRider", rating: 5, comment: "The hot air balloon ride at sunrise was magical!" }
        ]
    }
];

const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<FaStar key={i} className="star filled" />);
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
        } else {
            stars.push(<FaRegStar key={i} className="star empty" />);
        }
    }
    
    return <div className="star-rating">{stars}</div>;
};

const Main = () => {
    const [data, setData] = useState(initialData);
    const [expandedDestination, setExpandedDestination] = useState(null);

    const toggleExpand = (id) => {
        setExpandedDestination(expandedDestination === id ? null : id);
    };

    const calculateAverageRating = (reviews) => {
        if (!reviews.length) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviews.length;
    };

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent grid">
                {data.map(({ id, imgSrc, destTitle, location, grade, fees, description, reviews }) => { 
                    const averageRating = calculateAverageRating(reviews);
                    
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
                                
                                {/* Star rating display */}
                                <div className="rating-section">
                                    <StarRating rating={averageRating} />
                                    <span className="review-count">
                                        ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                                    </span>
                                </div>
                                
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
                                
                                <button 
                                    className="btn flex"
                                    onClick={() => toggleExpand(id)}
                                >
                                    {expandedDestination === id ? 'HIDE DETAILS' : 'DETAILS'} 
                                    <HiOutlineClipboardCheck className="icon" />
                                </button>
                                
                                {/* Expanded section with details (reviews moved to cart) */}
                                {expandedDestination === id && (
                                    <div className="details-section">
                                        <h5>Destination Details</h5>
                                        <div className="details-content">
                                            <p><strong>Location:</strong> {location}</p>
                                            <p><strong>Package Type:</strong> {grade}</p>
                                            <p><strong>Price:</strong> {fees}</p>
                                            <p className="full-description">{description}</p>
                                        </div>
                                        
                                        <div className="reviews-preview">
                                            <h5>Customer Reviews</h5>
                                            {reviews.length > 0 ? (
                                                <div className="reviews-list">
                                                    {reviews.slice(0, 2).map(review => (
                                                        <div key={review.id} className="review">
                                                            <div className="review-header">
                                                                <strong>{review.user}</strong>
                                                                <StarRating rating={review.rating} />
                                                            </div>
                                                            <p className="review-comment">{review.comment}</p>
                                                        </div>
                                                    ))}
                                                    {reviews.length > 2 && (
                                                        <p className="more-reviews">
                                                            + {reviews.length - 2} more reviews (see all in cart)
                                                        </p>
                                                    )}
                                                </div>
                                            ) : (
                                                <p>No reviews yet. You can add a review after booking.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Main;