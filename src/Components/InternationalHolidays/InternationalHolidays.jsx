import React, { useState, useRef } from 'react';
import './internationalHolidays.scss';
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

// Expanded sample data for international destinations (repeated 6 times)
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
  // Repeat destinations to test scrolling
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
  },
  {
    id: 509,
    imgSrc: 'https://images.unsplash.com/photo-1538970272646-f61fabb3be33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Tokyo (2)',
    location: 'Japan',
    grade: 'Urban Adventure',
    fees: '$2800',
    description: 'A dynamic mix of traditional and modern, with cutting-edge technology and ancient temples.',
    type: 'single'
  },
  {
    id: 510,
    imgSrc: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'New York (2)',
    location: 'USA',
    grade: 'City Break',
    fees: '$1900',
    description: 'The city that never sleeps, with iconic landmarks, museums, and diverse neighborhoods.',
    type: 'single'
  },
  {
    id: 511,
    imgSrc: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Sydney (2)',
    location: 'Australia',
    grade: 'Coastal City',
    fees: '$2500',
    description: 'Famous for its stunning harbor, Opera House, and beautiful beaches.',
    type: 'single'
  },
  {
    id: 512,
    imgSrc: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    destTitle: 'Rome (2)',
    location: 'Italy',
    grade: 'Historical',
    fees: '$1800',
    description: 'The Eternal City with ancient ruins, Renaissance art, and vibrant street life.',
    type: 'single'
  }
];

// Sample data for international packages (repeated 6 times)
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
  // Repeat packages to test scrolling
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
  },
  {
    id: 608,
    imgSrc: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'Asian Adventure (2)',
    locations: ['Tokyo', 'Bangkok', 'Singapore'],
    duration: '14 days, 13 nights',
    fees: '$4200',
    description: 'Explore the vibrant cultures and modern cities of Asia.',
    type: 'package',
    days: 14
  },
  {
    id: 609,
    imgSrc: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'American Dream (2)',
    locations: ['New York', 'Los Angeles', 'Las Vegas'],
    duration: '12 days, 11 nights',
    fees: '$3500',
    description: 'Experience the diversity of American cities and landscapes.',
    type: 'package',
    days: 12
  },
  {
    id: 610,
    imgSrc: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'Mediterranean Escape (2)',
    locations: ['Barcelona', 'Athens', 'Dubrovnik'],
    duration: '9 days, 8 nights',
    fees: '$3200',
    description: 'Relax and explore the beautiful coastal cities of the Mediterranean.',
    type: 'package',
    days: 9
  },
  {
    id: 611,
    imgSrc: 'https://images.unsplash.com/photo-1538970272646-f61fabb3be33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'Northern Lights (2)',
    locations: ['Reykjavik', 'Tromsø', 'Fairbanks'],
    duration: '8 days, 7 nights',
    fees: '$2900',
    description: 'Chase the aurora borealis in these northern destinations.',
    type: 'package',
    days: 8
  },
  {
    id: 612,
    imgSrc: 'https://images.unsplash.com/photo-1518544866330-95a2bfb6b1e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    packageTitle: 'Tropical Paradise (2)',
    locations: ['Maldives', 'Bora Bora', 'Fiji'],
    duration: '11 days, 10 nights',
    fees: '$4500',
    description: 'Relax in luxurious overwater bungalows in these tropical paradises.',
    type: 'package',
    days: 11
  }
];

const InternationalHolidays = () => {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [packages, setPackages] = useState(initialPackages);
  const { addToCart, cartItems } = useCart();
  
  const [newDestination, setNewDestination] = useState({
    destTitle: '',
    location: '',
    grade: '',
    fees: '',
    description: '',
    type: 'single'
  });

  // Refs for scrolling
  const destinationsRef = useRef(null);
  const packagesRef = useRef(null);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  const handleAddToCart = (item) => {
    const success = addToCart(item);
    if (success) {
      setDestinations([...destinations]);
      setPackages([...packages]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDestination({ ...newDestination, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDest = {
      id: Date.now(),
      imgSrc: 'https://source.unsplash.com/random/300x200/?travel',
      ...newDestination
    };
    
    if (newDestination.type === 'single') {
      setDestinations([...destinations, newDest]);
    } else {
      setPackages([...packages, {
        ...newDest,
        packageTitle: newDest.destTitle,
        locations: [newDest.location],
        duration: `${newDest.days || 3} days, ${(newDest.days || 3) - 1} nights`
      }]);
    }
    
    setNewDestination({
      destTitle: '',
      location: '',
      grade: '',
      fees: '',
      description: '',
      type: 'single'
    });
  };

  // Scroll functions for destinations
  const scrollDestinationsLeft = () => {
    if (destinationsRef.current) {
      destinationsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollDestinationsRight = () => {
    if (destinationsRef.current) {
      destinationsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Scroll functions for packages
  const scrollPackagesLeft = () => {
    if (packagesRef.current) {
      packagesRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollPackagesRight = () => {
    if (packagesRef.current) {
      packagesRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="internationalHolidays container section">
      <div className="secTitle">
        <h3 className="title">Popular International Destinations</h3>
      </div>

      <div className="destinationsContainer">
        <div className="scrollControls">
          <button className="scrollButton left" onClick={scrollDestinationsLeft}>
            <FiChevronLeft />
          </button>
          <div className="destinationsScroll" ref={destinationsRef}>
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
          <button className="scrollButton right" onClick={scrollDestinationsRight}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="secTitle" style={{ marginTop: '3rem' }}>
        <h3 className="title">International Holiday Packages</h3>
      </div>

      <div className="packagesContainer">
        <div className="scrollControls">
          <button className="scrollButton left" onClick={scrollPackagesLeft}>
            <FiChevronLeft />
          </button>
          <div className="packagesScroll" ref={packagesRef}>
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
          <button className="scrollButton right" onClick={scrollPackagesRight}>
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="addDestinationForm">
        <h3>Add New Destination</h3>
        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formGroup">
              <label>Destination Type:</label>
              <select 
                name="type" 
                value={newDestination.type}
                onChange={handleInputChange}
              >
                <option value="single">Single Destination</option>
                <option value="package">Package</option>
              </select>
            </div>
            
            <div className="formGroup">
              <label>{newDestination.type === 'package' ? 'Package Name' : 'Destination Name'}</label>
              <input 
                type="text" 
                name="destTitle" 
                value={newDestination.destTitle}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="formRow">
            <div className="formGroup">
              <label>Location</label>
              <input 
                type="text" 
                name="location" 
                value={newDestination.location}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="formGroup">
              <label>Grade/Type</label>
              <input 
                type="text" 
                name="grade" 
                value={newDestination.grade}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="formRow">
            <div className="formGroup">
              <label>Price</label>
              <input 
                type="text" 
                name="fees" 
                value={newDestination.fees}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {newDestination.type === 'package' && (
              <div className="formGroup">
                <label>Duration (days)</label>
                <input 
                  type="number" 
                  name="days" 
                  min="1"
                  value={newDestination.days || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
          </div>
          
          <div className="formGroup">
            <label>Description</label>
            <textarea 
              name="description" 
              value={newDestination.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button type="submit" className="submitBtn">Add Destination</button>
        </form>
      </div>
    </section>
  );
};

export default InternationalHolidays;