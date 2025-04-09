import React, { useState } from 'react';
import './myCart.scss';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { AiFillDelete } from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((_, i) => (
                <FaStar 
                    key={i} 
                    className={i < rating ? 'star filled' : 'star empty'} 
                    onClick={() => setRating(i + 1)}
                    style={{ cursor: 'pointer' }}
                />
            ))}
        </div>
    );
};

const MyCart = () => {
    const { cartItems, removeFromCart, calculateTotal } = useCart();
    const [bookingForms, setBookingForms] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('mpesa');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: ''
    });
    const [showReviewForm, setShowReviewForm] = useState(null);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: ''
    });

    const handleBookingChange = (id, field, value) => {
        setBookingForms({
            ...bookingForms,
            [id]: {
                ...bookingForms[id],
                [field]: value
            }
        });
    };

    const handleCardChange = (field, value) => {
        setCardDetails({
            ...cardDetails,
            [field]: value
        });
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmitReview = (itemId, e) => {
        e.preventDefault();
        // In a real app, you would send this to your backend
        console.log('Review submitted for', itemId, newReview);
        alert(`Thank you for your ${newReview.rating}-star review!`);
        setShowReviewForm(null);
        setNewReview({ rating: 5, comment: '' });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        // Validate all bookings have dates
        const incompleteBookings = cartItems.filter(item => {
            const booking = bookingForms[item.id];
            return !booking || !booking.travelDate || !booking.returnDate;
        });
        
        if (incompleteBookings.length > 0) {
            alert('Please complete all booking forms before payment');
            return;
        }
        
        // Handle payment submission
        console.log('Payment submitted', {
            method: paymentMethod,
            cardDetails,
            bookings: bookingForms,
            total: calculateTotal()
        });
        
        alert(`Payment of $${calculateTotal()} processed successfully!`);
    };

    return (
        <section className="myCart container section">
            <div className="secTitle">
                <h3 className="title">My Cart</h3>
                <p className="subtitle">Review your selected destinations and complete bookings</p>
            </div>

            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <p>Your cart is empty. Select some destinations to get started!</p>
                    <a href="/kenyan-holidays" className="btn">Browse Kenyan Holidays</a>
                    <a href="/international-holidays" className="btn">Browse International Holidays</a>
                </div>
            ) : (
                <div className="cartContent">
                    <div className="cartItems">
                        {cartItems.map(item => (
                            <div key={item.id} className="cartItem">
                                <div className="itemImage">
                                    <img src={item.imgSrc} alt={item.destTitle || item.packageTitle} />
                                </div>
                                
                                <div className="itemDetails">
                                    <h4>{item.destTitle || item.packageTitle}</h4>
                                    <span className="location flex">
                                        <HiOutlineLocationMarker className="icon" />
                                        <span>{item.location || item.locations?.join(', ')}</span>
                                    </span>
                                    
                                    {item.duration && <p className="duration">{item.duration}</p>}
                                    
                                    <p className="price">{item.fees}</p>
                                    <p className="description">{item.description}</p>
                                    
                                    <button 
                                        className="btn removeBtn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <AiFillDelete className="icon" /> Remove
                                    </button>

                                    {/* Review section */}
                                    <div className="reviewSection">
                                        <h5>Leave a Review</h5>
                                        {!showReviewForm || showReviewForm !== item.id ? (
                                            <button 
                                                className="btn reviewBtn"
                                                onClick={() => setShowReviewForm(item.id)}
                                            >
                                                Write a Review
                                            </button>
                                        ) : (
                                            <form onSubmit={(e) => handleSubmitReview(item.id, e)} className="reviewForm">
                                                <div className="formGroup">
                                                    <label>Your Rating:</label>
                                                    <StarRating 
                                                        rating={newReview.rating} 
                                                        setRating={(rating) => setNewReview({...newReview, rating})}
                                                    />
                                                </div>
                                                <div className="formGroup">
                                                    <label>Your Review:</label>
                                                    <textarea
                                                        name="comment"
                                                        value={newReview.comment}
                                                        onChange={handleReviewChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="formActions">
                                                    <button type="submit" className="btn submitBtn">
                                                        Submit Review
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="btn cancelBtn"
                                                        onClick={() => setShowReviewForm(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="bookingForm">
                                    <h5>Book This {item.packageTitle ? 'Package' : 'Destination'}</h5>
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="formGroup">
                                            <label>Travel Date:</label>
                                            <input 
                                                type="date" 
                                                value={bookingForms[item.id]?.travelDate || ''}
                                                onChange={(e) => handleBookingChange(item.id, 'travelDate', e.target.value)}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="formGroup">
                                            <label>Return Date:</label>
                                            <input 
                                                type="date" 
                                                value={bookingForms[item.id]?.returnDate || ''}
                                                onChange={(e) => handleBookingChange(item.id, 'returnDate', e.target.value)}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="formGroup">
                                            <label>Number of People:</label>
                                            <input 
                                                type="number" 
                                                min="1"
                                                value={bookingForms[item.id]?.people || ''}
                                                onChange={(e) => handleBookingChange(item.id, 'people', e.target.value)}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="formGroup">
                                            <label>Special Requests:</label>
                                            <textarea 
                                                value={bookingForms[item.id]?.requests || ''}
                                                onChange={(e) => handleBookingChange(item.id, 'requests', e.target.value)}
                                                placeholder="Any special requirements or notes"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="paymentSection">
                        <div className="summaryCard">
                            <h4>Order Summary</h4>
                            
                            <div className="summaryDetails">
                                {cartItems.map(item => (
                                    <div key={item.id} className="summaryItem">
                                        <span>{item.destTitle || item.packageTitle}</span>
                                        <span>{item.fees}</span>
                                    </div>
                                ))}
                                
                                <div className="summaryTotal">
                                    <span>Total:</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            </div>

                            <form className="paymentForm" onSubmit={handlePayment}>
                                <h4>Payment Method</h4>
                                
                                <div className="paymentOptions">
                                    <label className={`paymentOption ${paymentMethod === 'mpesa' ? 'active' : ''}`}>
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="mpesa" 
                                            checked={paymentMethod === 'mpesa'}
                                            onChange={() => setPaymentMethod('mpesa')}
                                        />
                                        <span>M-Pesa</span>
                                    </label>
                                    
                                    <label className={`paymentOption ${paymentMethod === 'card' ? 'active' : ''}`}>
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="card" 
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                        />
                                        <span>Credit/Debit Card</span>
                                    </label>
                                </div>
                                
                                {paymentMethod === 'card' && (
                                    <div className="cardDetails">
                                        <div className="formGroup">
                                            <label>Card Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="1234 5678 9012 3456"
                                                value={cardDetails.cardNumber}
                                                onChange={(e) => handleCardChange('cardNumber', e.target.value)}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="formRow">
                                            <div className="formGroup">
                                                <label>Expiry Date</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="MM/YY"
                                                    value={cardDetails.expiry}
                                                    onChange={(e) => handleCardChange('expiry', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="formGroup">
                                                <label>CVV</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="123"
                                                    value={cardDetails.cvv}
                                                    onChange={(e) => handleCardChange('cvv', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="formGroup">
                                            <label>Name on Card</label>
                                            <input 
                                                type="text" 
                                                placeholder="John Doe"
                                                value={cardDetails.name}
                                                onChange={(e) => handleCardChange('name', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                <button type="submit" className="btn payBtn">
                                    Pay ${calculateTotal()}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyCart;