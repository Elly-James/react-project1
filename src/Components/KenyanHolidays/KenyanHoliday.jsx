import React, { useState, useRef, useEffect } from 'react';
import './kenyanHolidays.scss';
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import AuthPromptModal from '../Navbar/AuthPromptModal.jsx';

const KenyanHolidays = () => {
    // Single Destinations Data
    const [destinations] = useState([
        {
            id: 1,
            imgSrc: 'https://images.unsplash.com/photo-1599422698635-c0a1a47c2a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            destTitle: 'Maasai Mara',
            location: 'Narok County',
            grade: 'Safari Destination',
            fees: '$1200',
            description: 'Home to the Great Migration, the Maasai Mara is one of Africa\'s most magnificent game reserves.',
            type: 'single'
        },
        {
            id: 2,
            imgSrc: 'https://images.unsplash.com/photo-1581434680096-5ae5ab1fadf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            destTitle: 'Amboseli',
            location: 'Kajiado County',
            grade: 'Wildlife Viewing',
            fees: '$950',
            description: 'Famous for its large elephant herds and views of Mount Kilimanjaro across the border in Tanzania.',
            type: 'single'
        },
        {
            id: 3,
            imgSrc: 'https://images.unsplash.com/photo-1581434680096-5ae5ab1fadf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            destTitle: 'Lake Nakuru',
            location: 'Nakuru County',
            grade: 'Bird Watching',
            fees: '$850',
            description: 'Known for its thousands of flamingos and diverse wildlife including rhinos and lions.',
            type: 'single'
        },
        {
            id: 4,
            imgSrc: 'https://images.unsplash.com/photo-1599422698635-c0a1a47c2a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            destTitle: 'Tsavo East',
            location: 'Taita-Taveta County',
            grade: 'Wilderness Experience',
            fees: '$1100',
            description: 'One of Kenya\'s largest parks with vast open spaces and the famous "red elephants".',
            type: 'single'
        },
        {
            id: 5,
            imgSrc: 'https://images.unsplash.com/photo-1581434680096-5ae5ab1fadf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            destTitle: 'Samburu',
            location: 'Samburu County',
            grade: 'Cultural Safari',
            fees: '$1300',
            description: 'Home to unique wildlife species not found in other Kenyan parks and rich cultural experiences.',
            type: 'single'
        },
        {
            id: 6,
            imgSrc: 'https://images.unsplash.com/photo-1599422698635-c0a1a47c2a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            destTitle: 'Malindi',
            location: 'Kilifi County',
            grade: 'Beach Destination',
            fees: '$900',
            description: 'Beautiful coastal town with white sandy beaches, marine parks and rich Swahili culture.',
            type: 'single'
        }
    ]);

    // Packages Data
    const [packages] = useState([
        {
            id: 101,
            imgSrc: 'https://images.unsplash.com/photo-1599422698635-c0a1a47c2a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            packageTitle: 'Kenya Safari Adventure',
            locations: ['Maasai Mara', 'Lake Nakuru', 'Amboseli'],
            duration: '7 days, 6 nights',
            fees: '$2800',
            description: 'Experience the best of Kenyan wildlife in this 7-day safari adventure covering three iconic national parks.',
            type: 'package',
            days: 7
        },
        {
            id: 102,
            imgSrc: 'https://images.unsplash.com/photo-1581434680096-5ae5ab1fadf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            packageTitle: 'Luxury Safari Experience',
            locations: ['Maasai Mara', 'Samburu', 'Laikipia'],
            duration: '10 days, 9 nights',
            fees: '$4500',
            description: 'Premium safari experience staying at luxury lodges with exclusive game viewing opportunities.',
            type: 'package',
            days: 10
        },
        {
            id: 103,
            imgSrc: 'https://images.unsplash.com/photo-1599422698635-c0a1a47c2a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            packageTitle: 'Beach & Bush Combo',
            locations: ['Tsavo East', 'Diani Beach'],
            duration: '8 days, 7 nights',
            fees: '$3200',
            description: 'Combine wildlife viewing with relaxation at Kenya\'s beautiful beaches for the perfect holiday.',
            type: 'package',
            days: 8
        },
        {
            id: 104,
            imgSrc: 'https://images.unsplash.com/photo-1581434680096-5ae5ab1fadf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            packageTitle: 'Mountain Trekking',
            locations: ['Mount Kenya', 'Aberdare Range'],
            duration: '6 days, 5 nights',
            fees: '$1800',
            description: 'Challenge yourself with breathtaking hikes through Kenya\'s mountain ranges and forests.',
            type: 'package',
            days: 6
        },
        {
            id: 105,
            imgSrc: 'https://images.unsplash.com/photo-1599422698635-c0a1a47c2a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            packageTitle: 'Family Safari',
            locations: ['Nairobi', 'Maasai Mara', 'Lake Naivasha'],
            duration: '9 days, 8 nights',
            fees: '$3800',
            description: 'Family-friendly safari with activities suitable for all ages and comfortable accommodations.',
            type: 'package',
            days: 9
        },
        {
            id: 106,
            imgSrc: 'https://images.unsplash.com/photo-1581434680096-5ae5ab1fadf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            packageTitle: 'Cultural Immersion',
            locations: ['Maasai Village', 'Lamu Island', 'Samburu'],
            duration: '12 days, 11 nights',
            fees: '$4200',
            description: 'Deep dive into Kenya\'s diverse cultures from coastal Swahili to northern nomadic tribes.',
            type: 'package',
            days: 12
        }
    ]);

    const { addToCart, cartItems, requireAuth } = useCart();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authAction, setAuthAction] = useState('');
    
    // Calculate how many cards to show per view based on screen size
    const [cardsPerView, setCardsPerView] = useState(3);
    const [destSlideIndex, setDestSlideIndex] = useState(0);
    const [packagesSlideIndex, setPackagesSlideIndex] = useState(0);
    
    // References to carousel containers for smooth animation
    const destGridRef = useRef(null);
    const packagesGridRef = useRef(null);

    // Update cards per view based on window size
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

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate max indices
    const maxDestIndex = Math.max(0, destinations.length - cardsPerView);
    const maxPackagesIndex = Math.max(0, packages.length - cardsPerView);

    // Apply transformations to the grid when slide index changes
    useEffect(() => {
        if (destGridRef.current) {
            // Calculate card width (including gap)
            const container = destGridRef.current.parentElement;
            const containerWidth = container.offsetWidth;
            const cardWidth = containerWidth / cardsPerView;
            
            // Apply transformation
            destGridRef.current.style.transform = `translateX(-${destSlideIndex * cardWidth}px)`;
        }
    }, [destSlideIndex, cardsPerView]);

    useEffect(() => {
        if (packagesGridRef.current) {
            // Calculate card width (including gap)
            const container = packagesGridRef.current.parentElement;
            const containerWidth = container.offsetWidth;
            const cardWidth = containerWidth / cardsPerView;
            
            // Apply transformation
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

        const success = addToCart(item);
        if (success) {
            // State updates handled by context
        }
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

    // Navbar height calculation for proper spacing
    const [navbarHeight, setNavbarHeight] = useState(0);
    
    useEffect(() => {
        // Get navbar height
        const navbar = document.querySelector('nav') || document.querySelector('header');
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);

    return (
        <section className="kenyanHolidays container section" style={{ paddingTop: `${navbarHeight + 20}px` }}>
            <div className="secTitle">
                <h3 className="title">Kenyan Holiday Experiences</h3>
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
                
                {/* Pagination indicators */}
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
                
                {/* Pagination indicators */}
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

export default KenyanHolidays;

