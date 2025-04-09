import React, { useState, useRef } from 'react';
import './kenyanHolidays.scss';
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

// Expanded sample data for Kenyan destinations (repeated 6 times)
const initialDestinations = [
  {
    id: 1,
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtupDF8gSD7CsCMw9pYWMTAhit-UlzbxofFg&s',
    destTitle: 'Maasai Mara',
    location: 'Narok County',
    grade: 'Safari Destination',
    fees: '$1200',
    description: 'Home to the Great Migration, the Maasai Mara is one of Africa\'s most magnificent game reserves.',
    type: 'single'
  },
  {
    id: 2,
    imgSrc: 'https://www.africanmeccasafaris.com/images/styles/african_mecca_safaris_kenya_amboseli_national_park_elephants_mt_kilimanjaro_001.jpg',
    destTitle: 'Amboseli',
    location: 'Kajiado County',
    grade: 'Wildlife Viewing',
    fees: '$950',
    description: 'Famous for its large elephant herds and views of Mount Kilimanjaro across the border in Tanzania.',
    type: 'single'
  },
  {
    id: 3,
    imgSrc: 'https://www.lakenakurukenya.com/wp-content/uploads/2020/01/lake-nakuru-national-park.jpg',
    destTitle: 'Lake Nakuru',
    location: 'Nakuru County',
    grade: 'Bird Watching',
    fees: '$850',
    description: 'Known for its thousands of flamingos and diverse wildlife including rhinos and lions.',
    type: 'single'
  },
  {
    id: 4,
    imgSrc: 'https://www.kws.go.ke/sites/default/files/styles/hero/public/2020-01/tsavo-east.jpg',
    destTitle: 'Tsavo East',
    location: 'Taita-Taveta County',
    grade: 'Wilderness Experience',
    fees: '$1100',
    description: 'One of Kenya\'s largest parks with vast open spaces and the famous "red elephants".',
    type: 'single'
  },
  {
    id: 5,
    imgSrc: 'https://www.samburu-national-reserve.com/images/styles/samburu-national-reserve-kenya-buffalo-springs-game-reserve-landscape-001.jpg',
    destTitle: 'Samburu',
    location: 'Samburu County',
    grade: 'Cultural Safari',
    fees: '$1300',
    description: 'Home to unique wildlife species not found in other Kenyan parks and rich cultural experiences.',
    type: 'single'
  },
  {
    id: 6,
    imgSrc: 'https://www.hellenicsafaris.com/wp-content/uploads/2020/07/hellenic-safaris-kenya-malindi-watamu-beach-001.jpg',
    destTitle: 'Malindi',
    location: 'Kilifi County',
    grade: 'Beach Destination',
    fees: '$900',
    description: 'Beautiful coastal town with white sandy beaches, marine parks and rich Swahili culture.',
    type: 'single'
  },
  // Repeat the destinations to test scrolling
  {
    id: 7,
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtupDF8gSD7CsCMw9pYWMTAhit-UlzbxofFg&s',
    destTitle: 'Maasai Mara (2)',
    location: 'Narok County',
    grade: 'Safari Destination',
    fees: '$1200',
    description: 'Home to the Great Migration, the Maasai Mara is one of Africa\'s most magnificent game reserves.',
    type: 'single'
  },
  {
    id: 8,
    imgSrc: 'https://www.africanmeccasafaris.com/images/styles/african_mecca_safaris_kenya_amboseli_national_park_elephants_mt_kilimanjaro_001.jpg',
    destTitle: 'Amboseli (2)',
    location: 'Kajiado County',
    grade: 'Wildlife Viewing',
    fees: '$950',
    description: 'Famous for its large elephant herds and views of Mount Kilimanjaro across the border in Tanzania.',
    type: 'single'
  },
  {
    id: 9,
    imgSrc: 'https://www.lakenakurukenya.com/wp-content/uploads/2020/01/lake-nakuru-national-park.jpg',
    destTitle: 'Lake Nakuru (2)',
    location: 'Nakuru County',
    grade: 'Bird Watching',
    fees: '$850',
    description: 'Known for its thousands of flamingos and diverse wildlife including rhinos and lions.',
    type: 'single'
  },
  {
    id: 10,
    imgSrc: 'https://www.kws.go.ke/sites/default/files/styles/hero/public/2020-01/tsavo-east.jpg',
    destTitle: 'Tsavo East (2)',
    location: 'Taita-Taveta County',
    grade: 'Wilderness Experience',
    fees: '$1100',
    description: 'One of Kenya\'s largest parks with vast open spaces and the famous "red elephants".',
    type: 'single'
  },
  {
    id: 11,
    imgSrc: 'https://www.samburu-national-reserve.com/images/styles/samburu-national-reserve-kenya-buffalo-springs-game-reserve-landscape-001.jpg',
    destTitle: 'Samburu (2)',
    location: 'Samburu County',
    grade: 'Cultural Safari',
    fees: '$1300',
    description: 'Home to unique wildlife species not found in other Kenyan parks and rich cultural experiences.',
    type: 'single'
  },
  {
    id: 12,
    imgSrc: 'https://www.hellenicsafaris.com/wp-content/uploads/2020/07/hellenic-safaris-kenya-malindi-watamu-beach-001.jpg',
    destTitle: 'Malindi (2)',
    location: 'Kilifi County',
    grade: 'Beach Destination',
    fees: '$900',
    description: 'Beautiful coastal town with white sandy beaches, marine parks and rich Swahili culture.',
    type: 'single'
  }
];

// Sample data for Kenyan packages (repeated 6 times)
const initialPackages = [
  {
    id: 101,
    imgSrc: 'https://qtxasset.com/quartz/qcloud1/media/image/Natural%20Habitat%20Adventures_Kenya%20Rhino%20Safari.jpeg?VersionId=lbWKvJJBWGfRBWsIxowwfCmadwhEN_29',
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
    imgSrc: 'https://www.africanspicesafaris.com/wp-content/uploads/2020/02/kenya-luxury-safari.jpg',
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
    imgSrc: 'https://www.africanmeccasafaris.com/images/styles/african_mecca_safaris_kenya_beach_safari_mombasa_diani_beach_001.jpg',
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
    imgSrc: 'https://www.kenyatourism.in/wp-content/uploads/2020/03/Mount-Kenya-Trekking.jpg',
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
    imgSrc: 'https://www.africanspicesafaris.com/wp-content/uploads/2020/02/kenya-family-safari.jpg',
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
    imgSrc: 'https://www.africanmeccasafaris.com/images/styles/african_mecca_safaris_kenya_cultural_safari_maasai_village_visit_001.jpg',
    packageTitle: 'Cultural Immersion',
    locations: ['Maasai Village', 'Lamu Island', 'Samburu'],
    duration: '12 days, 11 nights',
    fees: '$4200',
    description: 'Deep dive into Kenya\'s diverse cultures from coastal Swahili to northern nomadic tribes.',
    type: 'package',
    days: 12
  },
  // Repeat packages to test scrolling
  {
    id: 107,
    imgSrc: 'https://qtxasset.com/quartz/qcloud1/media/image/Natural%20Habitat%20Adventures_Kenya%20Rhino%20Safari.jpeg?VersionId=lbWKvJJBWGfRBWsIxowwfCmadwhEN_29',
    packageTitle: 'Kenya Safari Adventure (2)',
    locations: ['Maasai Mara', 'Lake Nakuru', 'Amboseli'],
    duration: '7 days, 6 nights',
    fees: '$2800',
    description: 'Experience the best of Kenyan wildlife in this 7-day safari adventure covering three iconic national parks.',
    type: 'package',
    days: 7
  },
  {
    id: 108,
    imgSrc: 'https://www.africanspicesafaris.com/wp-content/uploads/2020/02/kenya-luxury-safari.jpg',
    packageTitle: 'Luxury Safari Experience (2)',
    locations: ['Maasai Mara', 'Samburu', 'Laikipia'],
    duration: '10 days, 9 nights',
    fees: '$4500',
    description: 'Premium safari experience staying at luxury lodges with exclusive game viewing opportunities.',
    type: 'package',
    days: 10
  },
  {
    id: 109,
    imgSrc: 'https://www.africanmeccasafaris.com/images/styles/african_mecca_safaris_kenya_beach_safari_mombasa_diani_beach_001.jpg',
    packageTitle: 'Beach & Bush Combo (2)',
    locations: ['Tsavo East', 'Diani Beach'],
    duration: '8 days, 7 nights',
    fees: '$3200',
    description: 'Combine wildlife viewing with relaxation at Kenya\'s beautiful beaches for the perfect holiday.',
    type: 'package',
    days: 8
  },
  {
    id: 110,
    imgSrc: 'https://www.kenyatourism.in/wp-content/uploads/2020/03/Mount-Kenya-Trekking.jpg',
    packageTitle: 'Mountain Trekking (2)',
    locations: ['Mount Kenya', 'Aberdare Range'],
    duration: '6 days, 5 nights',
    fees: '$1800',
    description: 'Challenge yourself with breathtaking hikes through Kenya\'s mountain ranges and forests.',
    type: 'package',
    days: 6
  },
  {
    id: 111,
    imgSrc: 'https://www.africanspicesafaris.com/wp-content/uploads/2020/02/kenya-family-safari.jpg',
    packageTitle: 'Family Safari (2)',
    locations: ['Nairobi', 'Maasai Mara', 'Lake Naivasha'],
    duration: '9 days, 8 nights',
    fees: '$3800',
    description: 'Family-friendly safari with activities suitable for all ages and comfortable accommodations.',
    type: 'package',
    days: 9
  },
  {
    id: 112,
    imgSrc: 'https://www.africanmeccasafaris.com/images/styles/african_mecca_safaris_kenya_cultural_safari_maasai_village_visit_001.jpg',
    packageTitle: 'Cultural Immersion (2)',
    locations: ['Maasai Village', 'Lamu Island', 'Samburu'],
    duration: '12 days, 11 nights',
    fees: '$4200',
    description: 'Deep dive into Kenya\'s diverse cultures from coastal Swahili to northern nomadic tribes.',
    type: 'package',
    days: 12
  }
];

const KenyanHolidays = () => {
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
      imgSrc: 'https://source.unsplash.com/random/300x200/?kenya',
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
    <section className="kenyanHolidays container section">
      <div className="secTitle">
        <h3 className="title">Popular Kenyan Destinations</h3>
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
        <h3 className="title">Kenyan Holiday Packages</h3>
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

export default KenyanHolidays;