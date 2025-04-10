import React, { useState, useRef, useEffect } from 'react';
import './internationalHolidays.scss';
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import AuthPromptModal from '../Navbar/AuthPromptModal.jsx';





const initialDestinations = [
  {
    id: 501,
    imgSrc: 'https://images.unsplash.com/photo-1518544866330-95a2bfb6b1e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Bali',
    location: 'Indonesia',
    grade: 'Island Paradise',
    fees: '$1500',
    description: 'Known for its volcanic mountains, iconic rice paddies, beaches and coral reefs.',
    type: 'single'
  },
  {
    id: 502,
    imgSrc: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Paris',
    location: 'France',
    grade: 'Romantic Getaway',
    fees: '$2200',
    description: 'The City of Light, famous for its art, fashion, gastronomy and culture.',
    type: 'single'
  },
  {
    id: 503,
    imgSrc: 'https://images.unsplash.com/photo-1538970272646-f61fabb3be33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Tokyo',
    location: 'Japan',
    grade: 'Urban Adventure',
    fees: '$2800',
    description: 'A dynamic mix of traditional and modern, with cutting-edge technology and ancient temples.',
    type: 'single'
  },
  {
    id: 504,
    imgSrc: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'New York',
    location: 'USA',
    grade: 'City Break',
    fees: '$1900',
    description: 'The city that never sleeps, with iconic landmarks, museums, and diverse neighborhoods.',
    type: 'single'
  },
  {
    id: 505,
    imgSrc: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Sydney',
    location: 'Australia',
    grade: 'Coastal City',
    fees: '$2500',
    description: 'Famous for its stunning harbor, Opera House, and beautiful beaches.',
    type: 'single'
  },
  {
    id: 506,
    imgSrc: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Rome',
    location: 'Italy',
    grade: 'Historical',
    fees: '$1800',
    description: 'The Eternal City with ancient ruins, Renaissance art, and vibrant street life.',
    type: 'single'
  },
  {
    id: 507,
    imgSrc: 'https://images.unsplash.com/photo-1518544866330-95a2bfb6b1e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Bali (2)',
    location: 'Indonesia',
    grade: 'Island Paradise',
    fees: '$1500',
    description: 'Known for its volcanic mountains, iconic rice paddies, beaches and coral reefs.',
    type: 'single'
  },
  {
    id: 508,
    imgSrc: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Paris (2)',
    location: 'France',
    grade: 'Romantic Getaway',
    fees: '$2200',
    description: 'The City of Light, famous for its art, fashion, gastronomy and culture.',
    type: 'single'
  }
];

const initialPackages = [
  {
    id: 601,
    imgSrc: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'European Discovery',
    locations: ['Paris', 'Rome', 'Barcelona'],
    duration: '10 days, 9 nights',
    fees: '$3800',
    description: 'Experience the best of European culture, history, and cuisine.',
    type: 'package',
    days: 10
  },
  {
    id: 602,
    imgSrc: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'Asian Adventure',
    locations: ['Tokyo', 'Bangkok', 'Singapore'],
    duration: '14 days, 13 nights',
    fees: '$4200',
    description: 'Explore the vibrant cultures and modern cities of Asia.',
    type: 'package',
    days: 14
  },
  {
    id: 603,
    imgSrc: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'American Dream',
    locations: ['New York', 'Los Angeles', 'Las Vegas'],
    duration: '12 days, 11 nights',
    fees: '$3500',
    description: 'Experience the diversity of American cities and landscapes.',
    type: 'package',
    days: 12
  },
  {
    id: 604,
    imgSrc: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'Mediterranean Escape',
    locations: ['Barcelona', 'Athens', 'Dubrovnik'],
    duration: '9 days, 8 nights',
    fees: '$3200',
    description: 'Relax and explore the beautiful coastal cities of the Mediterranean.',
    type: 'package',
    days: 9
  },
  {
    id: 605,
    imgSrc: 'https://images.unsplash.com/photo-1538970272646-f61fabb3be33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'Northern Lights',
    locations: ['Reykjavik', 'Tromsø', 'Fairbanks'],
    duration: '8 days, 7 nights',
    fees: '$2900',
    description: 'Chase the aurora borealis in these northern destinations.',
    type: 'package',
    days: 8
  },
  {
    id: 606,
    imgSrc: 'https://images.unsplash.com/photo-1518544866330-95a2bfb6b1e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'Tropical Paradise',
    locations: ['Maldives', 'Bora Bora', 'Fiji'],
    duration: '11 days, 10 nights',
    fees: '$4500',
    description: 'Relax in luxurious overwater bungalows in these tropical paradises.',
    type: 'package',
    days: 11
  },
  {
    id: 607,
    imgSrc: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'European Discovery (2)',
    locations: ['Paris', 'Rome', 'Barcelona'],
    duration: '10 days, 9 nights',
    fees: '$3800',
    description: 'Experience the best of European culture, history, and cuisine.',
    type: 'package',
    days: 10
  }
];


const InternationalHolidays = () => {
    const [destinations] = useState(initialDestinations);
    const [packages] = useState(initialPackages);
    const { addToCart, cartItems, requireAuth } = useCart();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authAction, setAuthAction] = useState('');
    
    const [cardsPerView, setCardsPerView] = useState(3);
    const [destSlideIndex, setDestSlideIndex] = useState(0);
    const [packagesSlideIndex, setPackagesSlideIndex] = useState(0);
    
    const destGridRef = useRef(null);
    const packagesGridRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setCardsPerView(1);
            } else if (window.innerWidth <= 1024) {
                setCardsPerView(2);
            } else {
                setCardsPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxDestIndex = Math.max(0, destinations.length - cardsPerView);
    const maxPackagesIndex = Math.max(0, packages.length - cardsPerView);

    useEffect(() => {
        if (destGridRef.current) {
            const container = destGridRef.current.parentElement;
            const containerWidth = container.offsetWidth;
            const cardWidth = containerWidth / cardsPerView;
            destGridRef.current.style.transform = `translateX(-${destSlideIndex * cardWidth}px)`;
        }
    }, [destSlideIndex, cardsPerView]);

    useEffect(() => {
        if (packagesGridRef.current) {
            const container = packagesGridRef.current.parentElement;
            const containerWidth = container.offsetWidth;
            const cardWidth = containerWidth / cardsPerView;
            packagesGridRef.current.style.transform = `translateX(-${packagesSlideIndex * cardWidth}px)`;
        }
    }, [packagesSlideIndex, cardsPerView]);

    const isInCart = (id) => cartItems.some(item => item.id === id);

    const handleAddToCart = (item) => {
        const authCheck = requireAuth('addToCart');
        if (authCheck.requiresAuth) {
            setAuthAction(authCheck.action);
            setShowAuthModal(true);
            return;
        }

        addToCart(item);
    };

    const scrollDestinationsLeft = () => {
        setDestSlideIndex(prev => Math.max(0, prev - 1));
    };

    const scrollDestinationsRight = () => {
        setDestSlideIndex(prev => Math.min(maxDestIndex, prev + 1));
    };

    const scrollPackagesLeft = () => {
        setPackagesSlideIndex(prev => Math.max(0, prev - 1));
    };

    const scrollPackagesRight = () => {
        setPackagesSlideIndex(prev => Math.min(maxPackagesIndex, prev + 1));
    };

    const [navbarHeight, setNavbarHeight] = useState(0);
    
    useEffect(() => {
        const navbar = document.querySelector('nav') || document.querySelector('header');
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);

    return (
        <section className="internationalHolidays container section" style={{ paddingTop: `${navbarHeight + 20}px` }}>
            <div className="secTitle">
                <h3 className="title">International Holiday Destinations</h3>
            </div>

            <div className="secTitle" style={{ marginTop: '2rem' }}>
                <h4 className="subtitle">Single Destinations</h4>
            </div>

            <div className="destinationsContainer">
                <div className="scrollControls">
                    <button 
                        className={`scrollButton left ${destSlideIndex === 0 ? 'disabled' : ''}`} 
                        onClick={scrollDestinationsLeft}
                        disabled={destSlideIndex === 0}
                    >
                        <FiChevronLeft />
                    </button>
                    
                    <div className="carouselWrapper">
                        <div 
                            className="destinationsGrid" 
                            ref={destGridRef}
                        >
                            {destinations.map(destination => (
                                <div key={destination.id} className="singleDestination">
                                    <div className="imageDiv">
                                        <img src={destination.imgSrc} alt={destination.destTitle} />
                                    </div>
                                    <div className="cardInfo">
                                        <h4 className="destTitle">{destination.destTitle}</h4>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker className="icon" />
                                            <span className="name">{destination.location}</span>
                                        </span>
                                        
                                        <div className="fees flex">
                                            <div className="grade">
                                                <span>{destination.grade} <small>+1</small></span>
                                            </div>
                                            <div className="price">
                                                <h5>{destination.fees}</h5>
                                            </div>
                                        </div>
                                        
                                        <div className="desc">
                                            <p>{destination.description}</p>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleAddToCart(destination)}
                                            disabled={isInCart(destination.id)}
                                            className={`btn flex ${isInCart(destination.id) ? 'selected' : ''}`}
                                        >
                                            {isInCart(destination.id) ? 'Added to Cart' : 'Add to Cart'}
                                            <HiOutlineClipboardCheck className="icon" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        className={`scrollButton right ${destSlideIndex >= maxDestIndex ? 'disabled' : ''}`} 
                        onClick={scrollDestinationsRight}
                        disabled={destSlideIndex >= maxDestIndex}
                    >
                        <FiChevronRight />
                    </button>
                </div>
                
                <div className="pagination">
                    {Array.from({ length: maxDestIndex + 1 }).map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${destSlideIndex === index ? 'active' : ''}`}
                            onClick={() => setDestSlideIndex(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="secTitle" style={{ marginTop: '3rem' }}>
                <h4 className="subtitle">Holiday Packages</h4>
            </div>

            <div className="packagesContainer">
                <div className="scrollControls">
                    <button 
                        className={`scrollButton left ${packagesSlideIndex === 0 ? 'disabled' : ''}`} 
                        onClick={scrollPackagesLeft}
                        disabled={packagesSlideIndex === 0}
                    >
                        <FiChevronLeft />
                    </button>
                    
                    <div className="carouselWrapper">
                        <div 
                            className="packagesGrid" 
                            ref={packagesGridRef}
                        >
                            {packages.map(pkg => (
                                <div key={pkg.id} className="singleDestination">
                                    <div className="imageDiv">
                                        <img src={pkg.imgSrc} alt={pkg.packageTitle} />
                                    </div>
                                    <div className="cardInfo">
                                        <h4 className="destTitle">{pkg.packageTitle}</h4>
                                        <span className="continent flex">
                                            <HiOutlineLocationMarker className="icon" />
                                            <span className="name">{pkg.locations.join(', ')}</span>
                                        </span>
                                        
                                        <div className="fees flex">
                                            <div className="grade">
                                                <span>{pkg.duration} <small>+1</small></span>
                                            </div>
                                            <div className="price">
                                                <h5>{pkg.fees}</h5>
                                            </div>
                                        </div>
                                        
                                        <div className="desc">
                                            <p>{pkg.description}</p>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleAddToCart(pkg)}
                                            disabled={isInCart(pkg.id)}
                                            className={`btn flex ${isInCart(pkg.id) ? 'selected' : ''}`}
                                        >
                                            {isInCart(pkg.id) ? 'Added to Cart' : 'Add Package'}
                                            <HiOutlineClipboardCheck className="icon" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        className={`scrollButton right ${packagesSlideIndex >= maxPackagesIndex ? 'disabled' : ''}`} 
                        onClick={scrollPackagesRight}
                        disabled={packagesSlideIndex >= maxPackagesIndex}
                    >
                        <FiChevronRight />
                    </button>
                </div>
                
                <div className="pagination">
                    {Array.from({ length: maxPackagesIndex + 1 }).map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${packagesSlideIndex === index ? 'active' : ''}`}
                            onClick={() => setPackagesSlideIndex(index)}
                        />
                    ))}
                </div>
            </div>

            <AuthPromptModal 
                show={showAuthModal}
                action={authAction}
                onClose={() => setShowAuthModal(false)}
            />
        </section>
    );
};

export default InternationalHolidays;




